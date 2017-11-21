import * as actions from './actions'
import { Reducer } from 'redux'
import { Map, List, Set } from 'immutable'

import { Entity, Rel, Move, CoordWH, Transform } from 'grpc/erd_pb'

export interface EntityState {
    entities: Map<string, Entity>
    currentSelectEntities: Map<string, Entity>
    seqentialChoiceEntities: List<string> //choice sequential.e.g. when connecting with relation
    relationOfEntities: RelationOfEntities
}

// imutable relations store
export class RelationOfEntities {
    private rels: Map<string, Rel>

    private relObjIdByBeginEntityObjId: Map<string, Set<string>>
    private relObjIdByEndEntityObjId: Map<string, Set<string>>

    constructor(rels?: Map<string, Rel>) {

        this.rels = Map()
        this.relObjIdByBeginEntityObjId = Map()
        this.relObjIdByEndEntityObjId = Map()
        if (!rels) {
            return
        }

        this.rels = rels

        //TODO(taco) performance bottle neck?
        rels.valueSeq().forEach((rel) => {
            this.updateRelAddition(rel)
        })
    }

    map(): Map<string, Rel> {
        return this.rels
    }
    add(rel: Rel): RelationOfEntities {
        const newMap = this.rels.set(rel.getObjectId(), rel)
        return new RelationOfEntities(newMap)
    }

    private updateRelAddition(rel: Rel) {
        const relObjectId = rel.getObjectId()
        const begin = rel.getPointBegin()
        const end = rel.getPointEnd()

        this.relObjIdByBeginEntityObjId = this.addToMapOfSet(begin.getEntityObjectId(), relObjectId, this.relObjIdByBeginEntityObjId)
        this.relObjIdByEndEntityObjId = this.addToMapOfSet(end.getEntityObjectId(), relObjectId, this.relObjIdByEndEntityObjId)
    }

    //TODO(taco) performance bottle neck?
    private addToMapOfSet(key: string, val: string, src: Map<string, Set<string>>): Map<string, Set<string>> {
        if (src.has(key)) {
            return src.set(key, Set(val))
        } else {
            const srcList = src.get(key)
            const newList = srcList.add(val)
            return src.set(key, newList)
        }
    }


}


export const initialState: EntityState = {
    entities: Map<string, Entity>(),
    currentSelectEntities: Map<string, Entity>(),
    seqentialChoiceEntities: List<string>(),
    relationOfEntities: new RelationOfEntities()
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



        //case actions.EntityActionTypes.SELECT_ENTITY: {
        //    const objectId = <string>action.payload
        //    if (!objectId || objectId.length == 0 || !state.entities.has(objectId)) {
        //        console.error(`invalid entity:no object id[${objectId}]`)
        //        return
        //    }
        //    const entity = state.entities.get(objectId)

        //	  const m = Map<string, Entity>()
        //    return <EntityState>{
        //        ...state,
        //        currentSelectEntities:m.set(objectId,entity)
        //    }
        //}

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
        //    return <EntityState>{
        //        ...state,
        //    }

        case actions.EntityActionTypes.ADD_RELATION: {
            const rel = <Rel>action.payload

            return <EntityState>{
                ...state,
								seqentialChoiceEntities: List<string>(),
                relOfEntities: state.relationOfEntities.add(rel)
            }
        }

        default:
            return state
    }
}


