import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as Konva from 'konva'
import { Stage, Layer, Rect, Group, Circle } from 'react-konva'
import { Map } from 'immutable'
import { Entity, Rel, Coord, Move, Transform, CoordWH } from 'grpc/erd_pb'
import { newCoord, newCoordWH } from 'grpc/util/coord'
import { newMove } from 'grpc/util/move'
import { Anchor } from './Anchor'
import { positionFromEvent, EventPosition, PositionFunction } from './util/event_position'

export interface EntityPanelProps {
    key: string
    entity: Entity
    onSelect?: (objectId: string) => void
    onRelease?: (objectId: string) => void
    onMove?: (move: Move) => void
    onTransforming?: (objectId: string, coordWH: CoordWH) => void
    transformfinished?: (transform: Transform) => void
}

export interface EntityPanelState {
    anchorDragging: boolean
    dragStartAt?: Coord
    transformStartAt?: CoordWH
}

export class EntityPanel extends React.Component<EntityPanelProps, EntityPanelState>{
    //TODO(tacogips) if defined this type as "Reat", Konva.Rect methods will not found? check out after react 16.1 and its typedefinision released
    private refGroup: any

    constructor(props?: EntityPanelProps, context?: any) {
        super(props, context)
    }

    changeSize() {

    }

    onMouseOver = () => {
        document.body.style.cursor = 'pointer';
    }

    onMouseOut = () => {
        document.body.style.cursor = 'default';
    }

    onDragStart = (evt: any) => {

        if (this.state.anchorDragging) {
            return
        }
        const { onSelect, entity } = this.props
        onSelect(entity.getObjectId())

        const coord = newCoord(this.refGroup.attrs.x, this.refGroup.attrs.y)
        this.setState({ dragStartAt: coord })
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

        this.props.onMove(move)
        this.setState({ dragStartAt: null })
    }

    handleClick = () => {

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

        const topLeft: { x: number, y: number } = { x: 0, y: 0 }
        const topRight: { x: number, y: number } = { x: w, y: 0 }
        const bottomLeft: { x: number, y: number } = { x: 0, y: h }
        const bottomRight: { x: number, y: number } = { x: w, y: h }

        const genTransformHdr = (transformFn: (anchorPosition: EventPosition, parentEntity: Entity) => CoordWH, parentEntity: Entity) => {
            return (anchorPosition: EventPosition) => {
                const newCoordinateWidthHeight = transformFn(anchorPosition, parentEntity)
                this.props.onTransforming(this.props.entity.getObjectId(), newCoordinateWidthHeight)
            }
        }

        const anchorTransformTopLeft = genTransformHdr((anchorPosition: EventPosition, parentEntity: Entity) => {
            const newX = anchorPosition.layerX
            const newY = anchorPosition.layerY
            const newW = w - (anchorPosition.layerX - x)
            const newH = h - (anchorPosition.layerY - y)
            return newCoordWH({ x: newX, y: newY }, { w: newW, h: newH })
        }, entity)

        const anchorTransformTopRight = genTransformHdr((anchorPosition: EventPosition, parentEntity: Entity) => {
            const newX = x
            const newY = anchorPosition.layerY
            const newW = (anchorPosition.layerX - x)
            const newH = h - (anchorPosition.layerY - y)

            return newCoordWH({ x: newX, y: newY }, { w: newW, h: newH })
        }, entity)


        const anchorTransformBottomLeft = genTransformHdr((anchorPosition: EventPosition, parentEntity: Entity) => {
            const newX = anchorPosition.layerX
            const newY = y
            const newW = w - (anchorPosition.layerX - x)
            const newH = (anchorPosition.layerY - y)
            return newCoordWH({ x: newX, y: newY }, { w: newW, h: newH })
        }, entity)


        const anchorTransformBottomRight = genTransformHdr((anchorPosition: EventPosition, parentEntity: Entity) => {
            const newX = x
            const newY = y
            const newW = (anchorPosition.layerX - x)
            const newH = (anchorPosition.layerY - y)
            return newCoordWH({ x: newX, y: newY }, { w: newW, h: newH })
        }, entity)


        const anchorOnMouseDownPre = (evt: any) => {
            this.setState({ anchorDragging: true })
            this.refGroup.setDraggable(false) //TODO(tacogips)not work?
        }

        const anchorOnDragEndPre = (evt: any) => {
            ///this.setState({ anchorDragging: false })
            ///this.refGroup.setDraggable(true) //TODO(tacogips)not work?
        }

        return (
            <Group
                x={x}
                y={y}
                ref={(ref) => this.refGroup = ref}
                draggable={true}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                onClick={this.handleClick} >

                <Rect
                    width={entity.getWidthHeight().getW()}
                    height={titleBoxH}
                    fill={entity.getColor()}
                    shadowBlur={1}
                />

                <Rect
                    x={0}
                    y={columnBoxY}
                    width={entity.getWidthHeight().getW()}
                    height={columnBoxH}
                    fill={entity.getColor()}
                    shadowBlur={1} />

                <Anchor
                    x={topLeft.x} y={topLeft.y}
                    onMouseDownPre={anchorOnMouseDownPre}
                    onDragEndPre={anchorOnDragEndPre}
                    transforming={anchorTransformTopLeft} />

                <Anchor
                    x={topLeft.x + w} y={topLeft.y}
                    onMouseDownPre={anchorOnMouseDownPre}
                    onDragEndPre={anchorOnDragEndPre}
                    transforming={anchorTransformTopRight} />

                <Anchor
                    x={topLeft.x} y={topLeft.y + h}
                    onMouseDownPre={anchorOnMouseDownPre}
                    onDragEndPre={anchorOnDragEndPre}
                    transforming={anchorTransformBottomLeft} />

                <Anchor
                    x={topLeft.x + w} y={topLeft.y + h}
                    onMouseDownPre={anchorOnMouseDownPre}
                    onDragEndPre={anchorOnDragEndPre}
                    transforming={anchorTransformBottomRight} />

            </Group >
        );
    }
}


