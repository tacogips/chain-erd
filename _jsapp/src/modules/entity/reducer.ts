import * as actions from './actions'
import { Reducer } from 'redux'

import { Entity, Rel } from 'grpc/erd_pb'

export interface EntityState {
    entities: Map<string, Entity.AsObject>
}

export const initialState: EntityState = {
	entities: new Map<string, Entity.AsObject>()
}

export const entityReducer: Reducer<EntityState> = (state: EntityState = initialState, action: actions.EntityAction) => {
    switch (action.type) {
        case actions.EntityActionTypes.CREATE_NEW_ENTITY:
            return <EntityState>{
                ...state,
            }

        //case actions.EntityActionTypes.DELETE_ENTITY:
        //    return <EntityState>{
        //        ...state,
        //    }

        default:
            return state
    }
}

