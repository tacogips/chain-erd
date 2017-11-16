import * as redux from 'redux'
import { FSAction, EmptyAction } from 'modules/base/fsa'
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'

import { Entity, Rel , Move} from 'grpc/erd_pb'


//=== action types ============
export type EntityActionTypes = string
export module EntityActionTypes {
    export const CREATE_NEW_ENTITY: EntityActionTypes = 'CREATE_NEW_ENTIY'
    export const DELETE_ENTITY: EntityActionTypes = 'DELETE_ENTIY'
    export const MOVE_ENTITY: EntityActionTypes = 'MOVE_ENTITY'
}

// === actions ===============
export interface CreateNewEntity extends FSAction<Entity> {
    type: EntityActionTypes,
    payload: Entity
}

export interface DeleteEntity extends FSAction<Entity> {
    type: EntityActionTypes,
    payload: Entity
}

export interface MoveEntity extends FSAction<Move> {
    type: EntityActionTypes,
    payload: Move
}

export type EntityAction = CreateNewEntity | DeleteEntity

// === action creator =================
export const actionCreators = {
    createNewEntity: (entity: Entity) => {
        return <CreateNewEntity>{
            type: EntityActionTypes.CREATE_NEW_ENTITY,
						payload: entity
        }
    },

    deleteEntity: (entity: Entity) => {
        return <DeleteEntity>{
            type: EntityActionTypes.DELETE_ENTITY,
						payload: entity
        }
    },

    moveEntity: (move: Move) => {
        return <MoveEntity>{
            type: EntityActionTypes.MOVE_ENTITY,
						payload: move
        }
    },

}

