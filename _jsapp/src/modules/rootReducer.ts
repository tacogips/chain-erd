import { combineReducers } from 'redux'
import { controlReducer as control, ControlState } from './control'
import { entityReducer as entity, EntityState } from './entity'

import { Entity, Rel } from 'grpc/erd_pb'

export interface RootState {
	  control? : ControlState
		envity? : EntityState

    //entities: Map<string, Entity.AsObject>
    //rels: Map<string, Rel.AsObject>
}

export const rootReducer = combineReducers<RootState>({
		control,
		entity
})

export default rootReducer

