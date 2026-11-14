import { combineReducers } from 'redux'
import {articleReducer as articles, ArticleState } from './articles'

export interface State{
	articles:ArticleState
}

const rootReducer = combineReducers<State>({
    articles,
})

export default rootReducer
