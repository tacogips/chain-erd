import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as Konva from 'konva'
import { Stage, Layer, Rect, Group, Circle, Text } from 'react-konva'
import { Map } from 'immutable'
import { Entity, Rel, Coord, Move, Transform, CoordWH } from 'grpc/erd_pb'
import { newCoord, newCoordWH } from 'grpc/util/coord'
import { newTransform } from 'grpc/util/transform'
import { newMove } from 'grpc/util/move'
import { Anchor } from './Anchor'
import { positionFromEvent, EventPosition, PositionFunction } from './util/event_position'


import { ColumnsInEntityPanel, ColumnsInEntityPanelProps } from './ColumnsInEntityPanel'

export interface EntityPanelProps {
    key: string
    entity: Entity
    onSelect?: (objectId: string) => void
    onRelease?: (objectId: string) => void
    onMoving?: (objectId: string,evtPos:EventPosition) => void
    onMoveEnd?: (move: Move) => void
    onTransforming?: (objectId: string, coordWH: CoordWH) => void
    onTransformFinished?: (transform: Transform) => void
}

export interface EntityPanelState {
    anchorDragging: boolean
    dragStartAt?: Coord
    transformStartAt?: CoordWH
    showAnchors: boolean

    width: number, //TODO(tacogips) ugly.for realtime update
    height: number
}

export class EntityPanel extends React.Component<EntityPanelProps, EntityPanelState>{
    //TODO(tacogips) if defined this type as "Reat", Konva.Rect methods will not found? check out after react 16.1 and its typedefinision released
    private refGroup: any

    constructor(props?: EntityPanelProps, context?: any) {
        super(props, context)

        const width = this.props.entity.getWidthHeight().getW()
        const height = this.props.entity.getWidthHeight().getH()
        this.state = {
            anchorDragging: false,
            showAnchors: false,
            dragStartAt: null,
            transformStartAt: null,
            width: width,
            height: height
        }
    }

    onMouseOver = () => {
        document.body.style.cursor = 'pointer';
        this.setState({ showAnchors: true })
    }

    onMouseOut = () => {
        document.body.style.cursor = 'default';
        //this.setState({ showAnchors: false })
    }

    onClick = (evt: any) => {
        const { onSelect, entity } = this.props
        onSelect(entity.getObjectId())
    }

    onDragStart = (evt: any) => {
        if (this.state.anchorDragging) {
            return
        }

        const coord = newCoord(this.refGroup.attrs.x, this.refGroup.attrs.y)
        this.setState({ dragStartAt: coord })
    }

		onDragMove =(evt:any)=>{
        if (this.state.anchorDragging) {
            return
        }

				const pos = positionFromEvent(evt.evt)
				this.props.onMoving(this.props.entity.getObjectId(),pos)
		}

    onDragEnd = (evt: any) => {
        if (this.state.anchorDragging) {

            // end anchor action
            this.setState({ anchorDragging: false })
            this.refGroup.setDraggable(true) //TODO(tacogips)not work?
            return
        }
        if (!this.state.dragStartAt) {
            console.error("invalid dragging")
            return
        }

        const to = newCoord(this.refGroup.attrs.x, this.refGroup.attrs.y)
        const move = newMove(this.props.entity.getObjectId(), this.state.dragStartAt, to)

        this.props.onMoveEnd(move)
        this.setState({ dragStartAt: null })
    }

    genAnchors = (entity: Entity, x: number, y: number, w: number, h: number) => {

        const topLeft: { x: number, y: number } = { x: 0, y: 0 }
        const topRight: { x: number, y: number } = { x: w, y: 0 }
        const bottomLeft: { x: number, y: number } = { x: 0, y: h }
        const bottomRight: { x: number, y: number } = { x: w, y: h }

        const genTransformHdr = (transformFn: (anchorPosition: EventPosition, parentEntity: Entity) => CoordWH, parentEntity: Entity) => {
            return (anchorPosition: EventPosition) => {
                const newCoordinateWidthHeight = transformFn(anchorPosition, parentEntity)
                // for real time update
                this.setState(
                    {
                        width: newCoordinateWidthHeight.getWidthHeight().getW(),
                        height: newCoordinateWidthHeight.getWidthHeight().getH()
                    })
                this.props.onTransforming(entity.getObjectId(), newCoordinateWidthHeight)
            }
        }

        const anchorTransformTopLeft = (anchorPosition: EventPosition, parentEntity: Entity) => {
            const newX = anchorPosition.layerX
            const newY = anchorPosition.layerY
            const newW = w - (anchorPosition.layerX - x)
            const newH = h - (anchorPosition.layerY - y)
            return newCoordWH({ x: newX, y: newY }, { w: newW, h: newH })
        }

        const anchorTransformTopRight = (anchorPosition: EventPosition, parentEntity: Entity) => {
            const newX = x
            const newY = anchorPosition.layerY
            const newW = (anchorPosition.layerX - x)
            const newH = h - (anchorPosition.layerY - y)

            return newCoordWH({ x: newX, y: newY }, { w: newW, h: newH })
        }


        const anchorTransformBottomLeft = (anchorPosition: EventPosition, parentEntity: Entity) => {
            const newX = anchorPosition.layerX
            const newY = y
            const newW = w - (anchorPosition.layerX - x)
            const newH = (anchorPosition.layerY - y)
            return newCoordWH({ x: newX, y: newY }, { w: newW, h: newH })
        }

        const anchorTransformBottomRight = (anchorPosition: EventPosition, parentEntity: Entity) => {
            const newX = x
            const newY = y
            const newW = (anchorPosition.layerX - x)
            const newH = (anchorPosition.layerY - y)
            return newCoordWH({ x: newX, y: newY }, { w: newW, h: newH })
        }


        const anchorOnMouseDownPre = (evt: any) => {
            this.setState({ anchorDragging: true })
            this.refGroup.setDraggable(false) //TODO(tacogips)not work?
        }

        const genTransformfinishedFn = (newCoordWh: (anchorPosition: EventPosition, parentEntity: Entity) => CoordWH) => (pos: EventPosition) => {

            const from = newCoordWH(
                {
                    x: entity.getCoord().getX(),
                    y: entity.getCoord().getY()
                },

                {
                    w: entity.getWidthHeight().getW(),
                    h: entity.getWidthHeight().getH()
                })

            const to = newCoordWh(pos, entity)

            const transform = newTransform(entity.getObjectId(), from, to)
            this.props.onTransformFinished(transform)
        }

        const anchors: React.ReactElement<Anchor>[] = []
        anchors.push(<Anchor
            key={"topleft"}
            x={topLeft.x} y={topLeft.y}
            onMouseDownPre={anchorOnMouseDownPre}
            transforming={genTransformHdr(anchorTransformTopLeft, entity)}
            transformed={genTransformfinishedFn(anchorTransformTopLeft)}
        />)

        anchors.push(<Anchor

            key={"topright"}
            x={topLeft.x + w} y={topLeft.y}
            onMouseDownPre={anchorOnMouseDownPre}
            transforming={genTransformHdr(anchorTransformTopRight, entity)}
            transformed={genTransformfinishedFn(anchorTransformTopRight)}
        />)

        anchors.push(<Anchor
            key={"bottomleft"}
            x={topLeft.x} y={topLeft.y + h}
            onMouseDownPre={anchorOnMouseDownPre}
            transforming={genTransformHdr(anchorTransformBottomLeft, entity)}
            transformed={genTransformfinishedFn(anchorTransformBottomLeft)}
        />)

        anchors.push(<Anchor
            key={"bottomright"}
            x={topLeft.x + w} y={topLeft.y + h}
            onMouseDownPre={anchorOnMouseDownPre}
            transforming={genTransformHdr(anchorTransformBottomRight, entity)}
            transformed={genTransformHdr(anchorTransformBottomRight, entity)}
        />)

        return anchors
    }


    render() {
        const { entity } = this.props

        const x = entity.getCoord().getX()
        const y = entity.getCoord().getY()
        const w = entity.getWidthHeight().getW()
        const h = entity.getWidthHeight().getH()

        const titleBoxH = 20 //TODO(tacogips)
        const columnBoxY = titleBoxH
        const columnBoxH = h - 20

        let anchors: React.ReactElement<Anchor>[] = []
        if (this.state.showAnchors) {
            anchors = this.genAnchors(entity, x, y, w, h)
        }

				// offset for adjusting appearance
        const titleOffset: { x: number, y: number } = { x: 5, y: 3 }
        const columnAreaOffset: { x: number, y: number } = { x: 5, y: 3 }

        return (
            <Group
                x={x}
                y={y}
                ref={(ref) => this.refGroup = ref}
                draggable={true}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onDragStart={this.onDragStart}
                onDragMove={this.onDragMove}
                onDragEnd={this.onDragEnd}
                onClick={this.onClick} >

                <Rect
                    width={entity.getWidthHeight().getW()}
                    height={titleBoxH}
                    fill={entity.getColor()}
                    shadowBlur={1}
                />
                <Text text={entity.getName()}
                    x={titleOffset.x} y={titleOffset.y}
                    width={entity.getWidthHeight().getW()-titleOffset.x}
                    height={titleBoxH} />

                <Rect
                    x={0}
                    y={columnBoxY}
                    width={entity.getWidthHeight().getW()}
                    height={columnBoxH}
                    fill={entity.getColor()}
                    shadowBlur={1} />

                <ColumnsInEntityPanel
										entity={entity}
                    x={columnAreaOffset.x}
                    y={columnBoxY+columnAreaOffset.y}
                    w={entity.getWidthHeight().getW()-columnAreaOffset.x}
                    h={columnBoxH} />

                {anchors}

            </Group >
        );
    }

}


