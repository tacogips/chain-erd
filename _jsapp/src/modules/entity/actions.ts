import * as redux from 'redux'
import { FSAction, EmptyAction } from 'modules/base/fsa'
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'

import { Entity, Rel, Move, Coord,CoordWH, Transform } from 'grpc/erd_pb'

//=== action types ============
export type EntityActionTypes = string
export module EntityActionTypes {
    export const CREATE_NEW_ENTITY: EntityActionTypes = 'CREATE_NEW_ENTIY'
    export const DELETE_ENTITY: EntityActionTypes = 'DELETE_ENTIY'
    export const MOVE_ENTITY: EntityActionTypes = 'MOVE_ENTITY'
    export const MOVING_ENTITY: EntityActionTypes = 'MOVING_ENTITY'
    export const SELECT_ENTITY: EntityActionTypes = 'SELECT_ENTITY'
    export const CHOICE_ENTITIES: EntityActionTypes = 'CHOICE_ENTITIES'
    export const SEQ_CHOICE_ENTITIES: EntityActionTypes = 'SEQ_CHOICE_ENTITIES'

    export const TRANSFORMING_ENTITY: EntityActionTypes = 'TRANSFORMING_ENTITY'
    export const TRANSFORM_FINISHED_ENTITY: EntityActionTypes = 'TRANSFORM_FINISHED_ENTITY'

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

export interface MovingEntity extends FSAction<{objectId:string,coord:Coord}> {
    type: EntityActionTypes,
    payload: {objectId:string,coord:Coord}
}

export interface MoveEntity extends FSAction<Move> {
    type: EntityActionTypes,
    payload: Move
}

export interface SelectEntity extends FSAction<string> {
    type: EntityActionTypes,
    payload: string
}

export interface ChoiceEntities extends FSAction<string> {
    type: EntityActionTypes,
    payload: string
}

// choice sequential
export interface SeqChoiceEntities extends FSAction<string> {
    type: EntityActionTypes,
    payload: string
}

// on action end
export interface ReleaseEntity extends FSAction<string> {
    type: EntityActionTypes,
    payload: string
}

// Transforming

//TODO(tacogips) :delete
export interface TransformingEntity extends FSAction<{ objectId: string, coordWH: CoordWH }> {
    type: EntityActionTypes,
    payload: {
        objectId: string,
        coordWH: CoordWH
    }
}

// Transforming
export interface TransformFinishedEntity extends FSAction<Transform> {
    type: EntityActionTypes,
    payload: Transform
}

export type EntityAction =
    CreateNewEntity |
    DeleteEntity |
    SelectEntity |
		ChoiceEntities|
		SeqChoiceEntities|
    ReleaseEntity |
    MoveEntity |
    MovingEntity |
    TransformingEntity |
    TransformFinishedEntity


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

	//TODO(tacogips) rename to "move finished entity"
    moveEntity: (move: Move) => {
        return <MoveEntity>{
            type: EntityActionTypes.MOVE_ENTITY,
            payload: move
        }
    },

	movingEntity: (objectId:string,coord:Coord) => {
        return <MovingEntity>{
            type: EntityActionTypes.MOVING_ENTITY,
            payload: {objectId:objectId,coord:coord}
        }
    },

    selectEntity: (objectId: string) => {
        return <SelectEntity>{
            type: EntityActionTypes.SELECT_ENTITY,
            payload: objectId
        }
    },

    choiceEntities: (objectId: string) => {
        return <ChoiceEntities>{
            type: EntityActionTypes.CHOICE_ENTITIES,
            payload: objectId
        }
    },

    seqChoiceEntities: (objectId: string) => {
        return <SeqChoiceEntities>{
            type: EntityActionTypes.SEQ_CHOICE_ENTITIES,
            payload: objectId
        }
    },

	//TODO(tacogips) :delete
    transformingEntity: (objectId: string, coordWH: CoordWH) => {
        return <TransformingEntity>{
            type: EntityActionTypes.TRANSFORMING_ENTITY,
            payload: { objectId: objectId, coordWH: coordWH }
        }
    },

    transformFinishedEntity: (transform: Transform) => {
        return <TransformFinishedEntity>{
            type: EntityActionTypes.TRANSFORM_FINISHED_ENTITY,
            payload: transform
        }
    }
}

