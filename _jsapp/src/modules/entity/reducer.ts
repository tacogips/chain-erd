import * as actions from './actions'
import { Reducer } from 'redux'

import { Entity, Rel } from 'grpc/erd_pb'


export interface Entities {
    [key: string]: Entity
}

export interface EntityState {
    entities: Entities
}


export const initialState: EntityState = {
    entities: {}
}

export const entityReducer: Reducer<EntityState> = (state: EntityState = initialState, action: actions.EntityAction) => {
    switch (action.type) {
        case actions.EntityActionTypes.CREATE_NEW_ENTITY:
            const entity = action.payload
            const objectId = entity.getObjectId()
            return <EntityState>{
                ...state,
                entities: { ...state.entities, objectId: entity }
            }

        //case actions.EntityActionTypes.DELETE_ENTITY:
        //    return <EntityState>{
        //        ...state,
        //    }

        default:
            return state
    }
}


