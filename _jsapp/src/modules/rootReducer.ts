import { combineReducers } from 'redux'
import { articleReducer as articles, ArticleState } from './articles'
import { controlReducer as control, ControlState } from './control'

import { Entity, Rel } from 'grpc/erd_pb'

export interface RootState {
    articles?: ArticleState
	  control? : ControlState
    entities: Map<string, Entity.AsObject>
    rels: Map<string, Rel.AsObject>
}

export const rootReducer = combineReducers<RootState>({
    articles,
		control
})

export default rootReducer

