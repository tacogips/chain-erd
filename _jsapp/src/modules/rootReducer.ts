import { combineReducers } from 'redux'
import {articleReducer as articles, ArticleState } from './articles'

import { Entity, Rel } from 'grpc/erd_pb'

export interface RootState{
	articles? : ArticleState
	entities:Map<string,Entity>
}

export const rootReducer = combineReducers<RootState>({
    articles,
})

export default rootReducer

