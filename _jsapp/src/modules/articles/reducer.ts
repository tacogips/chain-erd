import { Article } from 'modules/models/Article'
import * as actions from './actions'
import { Reducer } from 'redux'

export interface ArticleState {
    latests: Article[],
    isLoading: boolean
    errorMessage?: string
}

export const initialState: ArticleState = {
    latests: [],
    isLoading: false
}


// reducer
export const articleReducer: Reducer<ArticleState> = (state: ArticleState = initialState, action: actions.ArticleAction) => {
    switch (action.type) {
        // request article
        case actions.ArticleActionTypes.REQUEST_ARTICLES_START: {
            return <ArticleState>{
                ...state,
                isLoading: true,
                errorMessage: undefined
            }
        }

        case actions.ArticleActionTypes.REQUEST_ARTICLES_COMPLETE: {
            const receiveArticelAction = (<actions.RequestArticlesComplete>action)
            const latestArticles  = [...state.latests, ...receiveArticelAction.articles]

            return <ArticleState>{
                ...state,
                isLoading: false,
                latests: latestArticles,
                errorMessage: undefined
            }
        }

        case actions.ArticleActionTypes.REQUEST_ARTICLES_ERROR: {
            const errorMessage = (<actions.RequestArticleError>action).message
            return <ArticleState>{
                ...state,
                isLoading: true,
                errorMessage
            }
        }

        default:
            return state
    }
}


