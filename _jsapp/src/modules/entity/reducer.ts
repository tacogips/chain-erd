import * as actions from './actions'
import { Reducer } from 'redux'

import { Entity, Rel } from 'grpc/erd_pb'

export interface EntityState {
    entities: Map<string, Entity>
}

interface Entitys{
		[key:string] : Entity
}

export const initialState: EntityState = {
	entities: Entitys
}

export const entityReducer: Reducer<EntityState> = (state: EntityState = initialState, action: actions.EntityAction) => {
    switch (action.type) {
        case actions.EntityActionTypes.CREATE_NEW_ENTITY:
						const entity = action.payload
            return <EntityState>{
                ...state,
								entities : {entities...,entity.getObjectId():entity }
            }

        //case actions.EntityActionTypes.DELETE_ENTITY:
        //    return <EntityState>{
        //        ...state,
        //    }

        default:
            return state
    }
}


