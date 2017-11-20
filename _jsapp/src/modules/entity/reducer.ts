import * as actions from './actions'
import { Reducer } from 'redux'
import { Map } from 'immutable'

import { Entity, Rel, Move, CoordWH ,Transform} from 'grpc/erd_pb'

export interface EntityState {
    entities: Map<string, Entity>
    currentSelectEntities: Map<string, Entity>
}

export const initialState: EntityState = {
    entities: Map<string, Entity>(),
    currentSelectEntities: Map<string, Entity>()
}

export const entityReducer: Reducer<EntityState> = (state: EntityState = initialState, action: actions.EntityAction) => {
    switch (action.type) {
        case actions.EntityActionTypes.CREATE_NEW_ENTITY: {
            const entity = <Entity>action.payload
            const objectId = entity.getObjectId()

            if (!objectId || objectId.length == 0) {
                console.error(`invalid entity:no object id[${objectId}]`)
                return
            }

            if (state.entities.has(objectId)) {
                console.error(`invalid entity:alerady exists[${objectId}]`)
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
                console.error(`cant move invalid object [${objectId}]`)
                return
            }

            const entity = state.entities.get(objectId)
            entity.setCoord(move.getTo())

            return <EntityState>{
                ...state,
                entities: state.entities.set(objectId, entity)
            }
        }


        case actions.EntityActionTypes.SELECT_ENTITY: {
            const objectId = <string>action.payload
            if (!objectId || objectId.length == 0 || !state.entities.has(objectId)) {
                console.error(`invalid entity:no object id[${objectId}]`)
                return
            }
            const entity = state.entities.get(objectId)

					  const m = Map<string, Entity>()
            return <EntityState>{
                ...state,
                currentSelectEntities:m.set(objectId,entity)
            }
        }

				case actions.EntityActionTypes.TRANSFORMING_ENTITY: {
				            const { objectId, coordWH } = <{ objectId: string, coordWH: CoordWH }>action.payload

				            if (!state.entities.has(objectId)) {
				                console.error("cant move invalid object [${objectId}]")
				                return
				            }

				            const entity = state.entities.get(objectId)
				            entity.setCoord(coordWH.getCoord())
				            entity.setWidthHeight(coordWH.getWidthHeight())

				            return <EntityState>{
				                ...state,
				                entities: state.entities.set(objectId, entity)
				            }
				}


        case actions.EntityActionTypes.TRANSFORM_FINISHED_ENTITY: {
            const transform = <Transform>action.payload
						const objectId =  transform.getObjectId()

            if (!state.entities.has(objectId)) {
                console.error(`cant move invalid object [${objectId}]`)
                return
            }

            const entity = state.entities.get(objectId)
            entity.setCoord(transform.getTo().getCoord())
            entity.setWidthHeight(transform.getTo().getWidthHeight())

            return <EntityState>{
                ...state,
                entities: state.entities.set(objectId, entity)
            }
        }


        //case actions.EntityActionTypes.DELETE_ENTITY:
        //case actions.EntityActionTypes.DELETE_ENTITY:
        //    return <EntityState>{
        //        ...state,
        //    }
        //TODO(tacogisp) selectEntity,releaseEntity
        default:
            return state
    }
}


