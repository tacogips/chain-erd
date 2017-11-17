import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as Konva from 'konva'
import { Stage, Layer, Rect, Group, Circle } from 'react-konva'
import { Map } from 'immutable'

import { Entity, Rel, Coord, Move } from 'grpc/erd_pb'

export interface EntityPanelProps {
    key: string
    entity: Entity
    onSelect?: (objectId: string) => void
    onRelease?: (objectId: string) => void
    onMove?: (move: Move) => void
}

export interface EntityPanelState {
    dragStartAt?: Coord
    previousMousePointer: string
}

export class EntityPanel extends React.Component<EntityPanelProps, EntityPanelState>{
    //TODO(tacogips) if defined this type as "Reat", Konva.Rect methods will not found? check out after react 16.1 and its typedefinision released
    private refRect: any

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

        const coord = new Coord()
				coord.setX(this.refRect.attrs.x)
				coord.setY(this.refRect.attrs.y)

        this.setState({ dragStartAt: coord })
    }

    onDragEnd = (evt: any) => {
        if (!this.state.dragStartAt) {
            console.error("invalid dragging")
            return
        }

        const to = new Coord()
				to.setX(this.refRect.attrs.x)
				to.setY(this.refRect.attrs.y)

        const move = new Move()
        move.setObjectId(this.props.entity.getObjectId())
        move.setFrom(this.state.dragStartAt)
        move.setTo(to)

        this.props.onMove(move)
        this.setState({ dragStartAt: null })
    }

    handleClick = () => {
        this.refRect.draw()
    }

    render() {
        const { entity } = this.props
        return (
            <Rect
                x={entity.getCoord().getX()}
                y={entity.getCoord().getY()}
                width={entity.getWidthHeight().getW()}
                height={entity.getWidthHeight().getH()}
                fill={entity.getColor()}
                shadowBlur={1}
                draggable={true}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                ref={(ref) => this.refRect = ref}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onClick={this.handleClick}
            />
        );
    }
}


