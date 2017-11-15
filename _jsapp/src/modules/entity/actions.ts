import * as redux from 'redux'
import { FSAction, EmptyAction } from 'modules/base/fsa'
import * as api from 'modules/api' //TODO 何故か modules/apiだとエラー
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'

import { Entity, Rel } from 'grpc/erd_pb'


//=== action types ============
export type EntityActionTypes = string
export module EntityActionTypes {
    export const CREATE_NEW_ENTITY: EntityActionTypes = 'CREATE_NEW_ENTIY'
    export const DELETE_ENTITY: EntityActionTypes = 'DELETE_ENTIY'
}

export interface CreateNewEntity extends FSAction<Entity> {
    type: EntityActionTypes,
    payload: Entity
}

export interface DeleteEntity extends FSAction<Entity> {
    type: EntityActionTypes,
    payload: Entity
}

export type EntityAction = CreateNewEntity

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
}

