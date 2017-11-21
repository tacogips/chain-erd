import * as actions from './actions'
import { Reducer } from 'redux'
import { Map, List, Set } from 'immutable'

import { Entity, Rel, Move, CoordWH, Transform } from 'grpc/erd_pb'

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

    add(rel: Rel): RelationOfEntities {
        const newMap = this.rels.set(rel.getObjectId(), rel)
        const { begin, end } = RelationOfEntities.updateRelAddition(rel, this.relObjIdByBeginEntityObjId, this.relObjIdByEndEntityObjId)
        return new RelationOfEntities(newMap, begin, end)
    }

    private static updateRelAddition(rel: Rel,
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

        default:
            return state
    }
}



