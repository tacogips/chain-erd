import { Article } from 'modules/models/Article'
import * as actions from './actions'
import { Reducer } from 'redux'

export interface ControlState {
	creatingNewEntity: boolean
}

export const initialState: ControlState  = {
    creatingNewEntity: false,
}

// reducer
export const articleReducer: Reducer<ControlState> = (state: ControlState = initialState, action: actions.ControlAction) => {
    switch (action.type) {
        // request article
        case actions.ControlActionTypes.PREPARE_NEW_ENTIY: {
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


