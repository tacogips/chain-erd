import { combineReducers } from 'redux'
import { controlReducer as control, ControlState } from './control'

import { Entity, Rel } from 'grpc/erd_pb'

export interface RootState {
	  control? : ControlState
    entities: Map<string, Entity.AsObject>
    rels: Map<string, Rel.AsObject>
}

export const rootReducer = combineReducers<RootState>({
		control
})

export default rootReducer

