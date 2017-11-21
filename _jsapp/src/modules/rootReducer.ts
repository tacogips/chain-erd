import { combineReducers } from 'redux'
import { controlReducer as control, ControlState } from './control'
import { entityReducer as entity, EntityState } from './entity'
import { relationReducer as relation, RelationState } from './relation'

import { Entity, Rel } from 'grpc/erd_pb'

export interface RootState {
    control?: ControlState
    entity?: EntityState
    relation?: RelationState
}

export const rootReducer = combineReducers<RootState>({
    control,
    entity,
    relation
})

export default rootReducer

