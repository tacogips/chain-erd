import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as Konva from 'konva'
import { Stage, Layer, Rect, Group, Circle, Text, Line } from 'react-konva'
import { Map } from 'immutable'
import { Entity, Rel, Coord, Move, Transform, CoordWH, RelPoint } from 'grpc/erd_pb'
import { getCentorCoord } from 'grpc/util/entity'
import { newCoord, newCoordWH, coordToArray } from 'grpc/util/coord'
import { newTransform } from 'grpc/util/transform'
import { newMove } from 'grpc/util/move'
import { Anchor } from './Anchor'
import { positionFromEvent, EventPosition, PositionFunction } from './util/event_position'

import { ColumnsInEntityPanel, ColumnsInEntityPanelProps } from './ColumnsInEntityPanel'

export interface RelLineProps {
    key: string // relation object id
    rel: Rel
    beginEntity: Entity
    endEntity: Entity
}

export interface RelLineState {

}

export class RelLine extends React.Component<RelLineProps, RelLineState>{
    private refGroup: any

    constructor(props?: RelLineProps, context?: any) {
        super(props, context)
    }

    render() {
        const { rel, beginEntity, endEntity } = this.props
        const beginCoord = getCentorCoord(beginEntity)
        const endCoord = getCentorCoord(endEntity)

        const points = coordToArray(beginCoord).concat(coordToArray(endCoord))

        //TODO(taco)
        console.debug(points)

        return (
            <Group ref={(ref) => this.refGroup = ref} >
                <Line points={points}
                    stroke="black"
                    strokeWidth={5}
                />
            </Group >
        );
    }
}

