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

export interface RelLineProps {
	rel:Rel
}

export interface RelLineState {

}

export class RelLine extends React.Component<RelLineProps , RelLineState >{
    private refGroup: any

    constructor(props?: RelLineProps, context?: any) {
        super(props, context)
    }

    render() {
        const { rel } = this.props

        return (
            <Group ref={(ref) => this.refGroup = ref} >
            </Group >
        );
    }
}

