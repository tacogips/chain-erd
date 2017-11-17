import * as actions from './actions'
import { Reducer } from 'redux'
import { Map } from 'immutable'

import { Entity, Rel, Move } from 'grpc/erd_pb'

export interface EntityState {
    entities: Map<string, Entity>
    currentSelectEntities: Entity[]
}

export const initialState: EntityState = {
    entities: Map<string, Entity>(),
    currentSelectEntities: []
}

export const entityReducer: Reducer<EntityState> = (state: EntityState = initialState, action: actions.EntityAction) => {
    switch (action.type) {
        case actions.EntityActionTypes.CREATE_NEW_ENTITY: {
            const entity = <Entity>action.payload
            const objectId = entity.getObjectId()

            if (!objectId || objectId.length == 0) {
                console.error("invalid entity:no object id[${entity}]")
                return
            }

            if (state.entities.has(objectId)) {
                console.error("invalid entity:alerady exists[${entity}]")
            }

            return <EntityState>{
                ...state,
                entities: state.entities.set(objectId, entity)
            }
        }

        case actions.EntityActionTypes.MOVE_ENTITY: {

            const move = <Move>action.payload
            const objectId = move.getObjectId()

            if (!state.entities.has(objectId)) {
                console.error("cant move invalid object [${objectId}]")
                return
            }

            const entity = state.entities.get(objectId)
            entity.setCoord(move.getTo())

            return <EntityState>{
                ...state,
                entities: state.entities.set(objectId, entity)
            }
        }

        //case actions.EntityActionTypes.DELETE_ENTITY:
        //    return <EntityState>{
        //        ...state,
        //    }
        //TODO(tacogisp) selectEntity,releaseEntity
        default:
            return state
    }
}


