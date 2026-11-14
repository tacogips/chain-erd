import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Map } from 'immutable'
import { Entity, Rel, Coord, Move, Transform, CoordWH } from 'grpc/erd_pb'
import { newCoord, newCoordWH } from 'grpc/util/coord'

export interface EntityEditPaneProps {
    currentSelectEntities?: Map<string, Entity>
}

export class EntityEditPane extends React.Component<EntityEditPaneProps, {}>{

    constructor(props?: EntityEditPaneProps, context?: any) {
        super(props, context)
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
