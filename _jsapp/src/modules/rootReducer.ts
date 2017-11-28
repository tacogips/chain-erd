import { combineReducers } from 'redux'
import { authReducer as auth, AuthState } from './auth'
import { controlReducer as control, ControlState } from './control'
import { entityReducer as entity, EntityState } from './entity'
import { relationReducer as relation, RelationState } from './relation'

import { Entity, Rel } from 'grpc/erd_pb'

export interface RootState {
		auth? : AuthState
    control?: ControlState
    entity?: EntityState
    relation?: RelationState
}

export const rootReducer = combineReducers<RootState>({
		auth,
    control,
    entity,
    relation
})

export default rootReducer

