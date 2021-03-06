import * as actions from './actions'
import { Reducer } from 'redux'
import { Map, List, Set } from 'immutable'

import { Entity, Rel, Move, Coord, CoordWH, Transform } from 'grpc/erd_pb'

import * as api from 'grpc/api'

export interface EntityState {
    entities: Map<string, Entity>
    currentSelectEntities: Map<string, Entity>
    seqentialChoiceEntities: List<string> //choice sequential.e.g. when connecting with relation
}

export const initialState: EntityState = {
    entities: Map<string, Entity>(),
    currentSelectEntities: Map<string, Entity>(),
    seqentialChoiceEntities: List<string>()
}

export const entityReducer: Reducer<EntityState> = (state: EntityState = initialState, action: actions.EntityAction) => {
    switch (action.type) {
        case actions.EntityActionTypes.CREATE_NEW_ENTITY: {
            const entity = <Entity>action.payload
            const objectId = entity.getObjectId()

            if (!objectId || objectId.length == 0) {
                console.error(`invalid entity:no object id[${objectId}]`)
                return state
            }

            if (state.entities.has(objectId)) {
                console.error(`invalid entity:alerady exists[${objectId}]`)
            }

            //TODO(taco) move to saga
            api.createEntity(entity)

            return <EntityState>{
                ...state,
                entities: state.entities.set(objectId, entity),
                seqentialchoiceEntities: List(),
            }
        }


        case actions.EntityActionTypes.MOVE_ENTITY: {

            const move = <Move>action.payload
            const objectId = move.getObjectId()

            if (!state.entities.has(objectId)) {
                console.error(`cant move invalid object [${objectId}]`)
                return
            }

            //TODO(taco) move to saga
            api.moveEntity(move)

            const entity = state.entities.get(objectId)
            entity.setCoord(move.getTo())

            return <EntityState>{
                ...state,
                entities: state.entities.set(objectId, entity),
                seqentialchoiceEntities: List()
            }
        }

        case actions.EntityActionTypes.MOVING_ENTITY: {

            const { objectId, coord } = <{ objectId: string, coord: Coord }>action.payload

            if (!state.entities.has(objectId)) {
                console.error(`cant move invalid object [${objectId}]`)
                return
            }

            const entity = state.entities.get(objectId)
            entity.setCoord(coord)

            return <EntityState>{
                ...state,
                entities: state.entities.set(objectId, entity),
                seqentialchoiceEntities: List()
            }
        }

        case actions.EntityActionTypes.CHOICE_ENTITIES: {
            const objectId = <string>action.payload
            if (!objectId || objectId.length == 0 || !state.entities.has(objectId)) {
                console.error(`invalid entity:no object id[${objectId}]`)
                return
            }
            const entity = state.entities.get(objectId)

            const m = Map<string, Entity>()

            return <EntityState>{
                ...state,
                currentSelectEntities: m.set(objectId, entity),
                seqentialchoiceEntities: List()
            }
        }

        case actions.EntityActionTypes.SEQ_CHOICE_ENTITIES: {
            const objectId = <string>action.payload
            if (!objectId || objectId.length == 0 || !state.entities.has(objectId)) {
                console.error(`invalid entity:no object id[${objectId}]`)
                return
            }

            return <EntityState>{
                ...state,
                currentSelectEntities: Map<string, Entity>(),
                seqentialChoiceEntities: state.seqentialChoiceEntities.push(objectId)
            }
        }

        case actions.EntityActionTypes.CANCEL_SELECTION: {
            return <EntityState>{
                ...state,
                currentSelectEntities: Map<string, Entity>(),
                seqentialChoiceEntities: List()
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
            const objectId = transform.getObjectId()

            if (!state.entities.has(objectId)) {
                console.error(`cant transform invalid object [${objectId}]`)
                return
            }


						console.debug('transform finished')
            //TODO(taco) move to saga
            api.transformEntity(transform)

            const entity = state.entities.get(objectId)
            entity.setCoord(transform.getTo().getCoord())
            entity.setWidthHeight(transform.getTo().getWidthHeight())

            return <EntityState>{
                ...state,
                entities: state.entities.set(objectId, entity)
            }
        }


        case actions.EntityActionTypes.STREAM_DOWN_ENTITY: {
            const entity = <Entity>action.payload
            const objectId = entity.getObjectId()

					console.debug('stream down')
					console.debug(objectId)
            return <EntityState>{
                ...state,
                entities: state.entities.set(objectId, entity)
            }
        }

        default:
            return state
    }
}


