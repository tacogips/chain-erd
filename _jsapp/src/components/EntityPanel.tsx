import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as Konva from 'konva'
import { Stage, Layer, Rect, Group, Circle } from 'react-konva'
import { Map } from 'immutable'
import { Entity, Rel, Coord, Move,Transform ,CoordWH} from 'grpc/erd_pb'
import { newCoord } from 'grpc/util/coord'
import { newMove } from 'grpc/util/move'
import { Anchor } from './Anchor'

export interface EntityPanelProps {
    key: string
    entity: Entity
    onSelect?: (objectId: string) => void
    onRelease?: (objectId: string) => void
    onMove?: (move: Move) => void
		transforming?: () => void
		transformfinished?: (transform:Transform ) => void

		redraw:()=>void
}

export interface EntityPanelState {
    dragStartAt?: Coord
    transformStartAt?:CoordWH
    previousMousePointer: string
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
        this.setState({ previousMousePointer: document.body.style.cursor })
        document.body.style.cursor = 'pointer';
    }

    onMouseOut = () => {
        document.body.style.cursor = this.state.previousMousePointer;
    }

    onDragStart = (evt: any) => {
        const { onSelect, entity } = this.props
        onSelect(entity.getObjectId())

        const coord = newCoord(this.refGroup.attrs.x, this.refGroup.attrs.y)
        this.setState({ dragStartAt: coord })
    }

    onDragEnd = (evt: any) => {
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
        const topRight: { x: number, y: number } = { x:  w, y: 0 }
        const bottomLeft: { x: number, y: number } = { x: 0, y:  h }
        const bottomRight: { x: number, y: number } = { x:  w, y:  h }

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
                onClick={this.handleClick}>

                <Rect
                    width={entity.getWidthHeight().getW()}
                    height={titleBoxH}
                    fill={entity.getColor()}
                    shadowBlur={1}
                />

                <Rect
                    y={columnBoxY}
                    width={entity.getWidthHeight().getW()}
                    height={columnBoxH}
                    fill={entity.getColor()}
                    shadowBlur={1} />
                <Anchor redraw={this.props.redraw} x={topLeft.x} y={topLeft.y} />
            </Group>
        );
    }
}


