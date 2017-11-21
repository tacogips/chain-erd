
import * as actions from './actions'
import { Reducer } from 'redux'
import { Map, List, Set } from 'immutable'

import { Entity, Rel, Move, Coord, CoordWH, Transform } from 'grpc/erd_pb'

export interface RelationState {
    relationOfEntities: RelationOfEntities
}

// imutable relations store
//TODO(taco) ugly
export class RelationOfEntities {
    static generateNew(): RelationOfEntities {
        return new RelationOfEntities(Map(), Map(), Map())
    }

    private rels: Map<string, Rel>

    private relObjIdByBeginEntityObjId: Map<string, Set<string>>
    private relObjIdByEndEntityObjId: Map<string, Set<string>>

    getRelationsConnectedTo(entityObjectId: string): Set<Rel> {
        const objIds = this.getRelationObjectIdsBeginWith(entityObjectId).merge(this.getRelationObjectIdsEndWith(entityObjectId))
        return Set(objIds.map((objId) => this.rels.get(objId)))
    }

    getRelationObjectIdsBeginWith(entityObjectId: string): Set<string> {
        if (!this.relObjIdByBeginEntityObjId.has(entityObjectId)) {
            return Set()
        }
        return this.relObjIdByBeginEntityObjId.get(entityObjectId)
    }

    getRelationObjectIdsEndWith(entityObjectId: string): Set<string> {
        if (!this.relObjIdByEndEntityObjId.has(entityObjectId)) {
            return Set()
        }
        return this.relObjIdByEndEntityObjId.get(entityObjectId)
    }

    getByObjectIds(objectIds: string[]): Rel[] {
        return objectIds.map((objectId) => {
            return this.rels.get(objectId)
        })
    }

    private constructor(rels: Map<string, Rel>,
        relObjIdByBeginEntityObjId: Map<string, Set<string>>,
        relObjIdByEndEntityObjId: Map<string, Set<string>>) {

        this.relObjIdByBeginEntityObjId = relObjIdByBeginEntityObjId
        this.relObjIdByEndEntityObjId = relObjIdByEndEntityObjId
        this.rels = rels
    }

    map(): Map<string, Rel> {
        return this.rels
    }

    add(newRel: Rel): RelationOfEntities {
        const newMap = this.rels.set(newRel.getObjectId(), newRel)

        const { begin, end } = RelationOfEntities.updateConnectedEntities(newRel, this.relObjIdByBeginEntityObjId, this.relObjIdByEndEntityObjId)
        return new RelationOfEntities(newMap, begin, end)
    }

    updates(targetRels: Rel[]): RelationOfEntities {
        let newMap = this.rels
        let begin = this.relObjIdByBeginEntityObjId
        let end = this.relObjIdByEndEntityObjId

        targetRels.forEach((eachRel) => {
            newMap = newMap.set(eachRel.getObjectId(), eachRel)
            const result = RelationOfEntities.updateConnectedEntities(eachRel, begin, end)
            begin = result.begin
            end = result.end
        })

        return new RelationOfEntities(newMap, begin, end)
    }

    private static updateConnectedEntities(rel: Rel,
        relObjIdByBeginEntityObjId: Map<string, Set<string>>,
        relObjIdByEndEntityObjId: Map<string, Set<string>>): { begin: Map<string, Set<string>>, end: Map<string, Set<string>> } {

        const relObjectId = rel.getObjectId()
        const begin = rel.getPointBegin()
        const end = rel.getPointEnd()

        return {
            begin: RelationOfEntities.addToMapOfSet(begin.getEntityObjectId(), relObjectId, relObjIdByBeginEntityObjId),
            end: RelationOfEntities.addToMapOfSet(end.getEntityObjectId(), relObjectId, relObjIdByEndEntityObjId)
        }
    }

    //TODO(taco) performance bottle neck?
    private static addToMapOfSet(key: string, val: string, src: Map<string, Set<string>>): Map<string, Set<string>> {
        if (!src.has(key)) {
            return src.set(key, Set(val))
        } else {
            const srcList = src.get(key)
            const newList = srcList.add(val)
            return src.set(key, newList)
        }
    }
}

export const initialState: RelationState = {
    relationOfEntities: RelationOfEntities.generateNew()
}

export const relationReducer: Reducer<RelationState> = (state: RelationState = initialState, action: actions.RelationAction) => {
    switch (action.type) {

        case actions.RelationActionTypes.ADD_RELATION: {
            const rel = <Rel>action.payload

            return <RelationState>{
                ...state,
                relationOfEntities: state.relationOfEntities.add(rel)
            }
        }

        case actions.RelationActionTypes.RERENDER_BY_ENTITY_MOVE: {
            const { entityObjectId, coord } = <{ entityObjectId: string, coord: Coord }>action.payload

						const targetRels = state.relationOfEntities.getRelationsConnectedTo(entityObjectId)

            // relationOfEntities.
            return <RelationState>{
                ...state,
                relationOfEntities: state.relationOfEntities.updates(targetRels.toArray())
            }
        }

        default:
            return state
    }
}



