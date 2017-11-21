import * as redux from 'redux'
import { FSAction, EmptyAction } from 'modules/base/fsa'
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'

import { Entity, Rel, Move, CoordWH, Transform } from 'grpc/erd_pb'


//=== action types ============
export type RelationActionTypes = string
export module RelationActionTypes {
    export const ADD_RELATION: RelationActionTypes = 'ADD_RELATION'
}

// === actions ===============
export interface AddRelation extends FSAction<Rel> {
    type: RelationActionTypes,
    payload: Rel
}


export type RelationAction =
		AddRelation


// === action creator =================
export const actionCreators = {
    addRelation: (rel: Rel) => {
        return <AddRelation>{
            type: RelationActionTypes.ADD_RELATION,
            payload: rel
        }
    }
}


