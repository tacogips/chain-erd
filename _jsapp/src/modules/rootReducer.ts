import { combineReducers } from 'redux'
import { controlReducer as control, ControlState } from './control'
import { entityReducer as entity, EntityState } from './entity'

import { Entity, Rel } from 'grpc/erd_pb'

export interface RootState {
	  control? : ControlState
		entity? : EntityState
}

export const rootReducer = combineReducers<RootState>({
		control,
		entity
})

export default rootReducer

