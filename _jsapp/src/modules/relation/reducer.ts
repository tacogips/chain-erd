import * as actions from './actions'
import { Reducer } from 'redux'
import { Map, List, Set } from 'immutable'

import { Entity, Rel, Move, CoordWH, Transform } from 'grpc/erd_pb'

export interface RelationState {
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
    relationOfEntities: new RelationOfEntities()
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



