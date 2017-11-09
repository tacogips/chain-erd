import { combineReducers } from 'redux'
import {articleReducer as articles, ArticleState } from './articles'

export interface RootState{
	articles:ArticleState
}

const rootReducer = combineReducers<RootState>({
    articles,
})

export default rootReducer
