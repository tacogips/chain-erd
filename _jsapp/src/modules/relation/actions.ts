import * as redux from 'redux'
import { FSAction, EmptyAction } from 'modules/base/fsa'
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'

import { Entity, Rel, Move, Coord, CoordWH, Transform } from 'grpc/erd_pb'


//=== action types ============
export type RelationActionTypes = string
export module RelationActionTypes {
    export const ADD_RELATION: RelationActionTypes = 'ADD_RELATION'
    export const RERENDER_BY_ENTITY_MOVE: RelationActionTypes = 'RERENDER_BY_ENTITY_MOVE'
}

// === actions ===============
export interface AddRelation extends FSAction<Rel> {
    type: RelationActionTypes,
    payload: Rel
}

export interface RerenderByEntityMove extends FSAction<{ entityObjectId: string, coord: Coord }> {
    type: RelationActionTypes,
    payload: { entityObjectId: string, coord: Coord }
}


export type RelationAction =
    AddRelation |
    RerenderByEntityMove

// === action creator =================
export const actionCreators = {
    addRelation: (rel: Rel) => {
        return <AddRelation>{
            type: RelationActionTypes.ADD_RELATION,
            payload: rel
        }
    },

    rerenderByEntityMove: (entityObjectId: string, coord: Coord) => {
        return <RerenderByEntityMove>{
            type: RelationActionTypes.RERENDER_BY_ENTITY_MOVE,
            payload: { entityObjectId: entityObjectId, coord: coord }
        }
    }
}
