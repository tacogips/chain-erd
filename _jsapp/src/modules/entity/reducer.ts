import * as actions from './actions'
import { Reducer } from 'redux'
import { Map } from 'immutable'

import { Entity, Rel } from 'grpc/erd_pb'


export interface EntityState {
    entities: Map<string, Entity>
}

export const initialState: EntityState = {
    entities: Map<string, Entity>()
}

export const entityReducer: Reducer<EntityState> = (state: EntityState = initialState, action: actions.EntityAction) => {
    switch (action.type) {
        case actions.EntityActionTypes.CREATE_NEW_ENTITY:
            const entity = action.payload
            const objectId = entity.getObjectId()

            if (!objectId || objectId.length == 0) {
                console.error("invalid entity:no object id[" + entity + "]")
                return
            }

            if (state.entities.has(objectId)) {
                console.error("invalid entity:alerady exists[" + entity + "]")
            }

            return <EntityState>{
                ...state,
                entities: state.entities.set(objectId, entity)
            }

        //case actions.EntityActionTypes.DELETE_ENTITY:
        //    return <EntityState>{
        //        ...state,
        //    }

        default:
            return state
    }
}


