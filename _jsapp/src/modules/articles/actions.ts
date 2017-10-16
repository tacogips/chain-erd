import * as redux from 'redux'
import { FSAction } from 'modules/base/fsa'
import { Article } from 'modules/models/Article'
import * as api from 'modules/api' //TODO 何故か modules/apiだとエラー
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'


export class FetchArticleCondition {
    constructor(
        public skipNum: number = 0,
        public fetchNum: number = 10) { }

    toQueryParam(): any {
        return {
            "skip_num": this.skipNum,
            "fetch_num": this.fetchNum
        }
    }
}


//=== action types ============
// TODO enum にしたいけど redux sagaのtakeLatesに渡すredux-saga.ActionType
// (type ActionType = string | number | symbol;)
// との互換がないので、文字列で定義してnamespaceで束縛だけしてある
export type ArticleActionTypes = string
export module ArticleActionTypes {
    export const REQUEST_ARTICLES: ArticleActionTypes = 'REQ_ARTICLES'
    export const REQUEST_ARTICLES_START: ArticleActionTypes = 'REQ_ARTICLES_START'
    export const REQUEST_ARTICLES_COMPLETE: ArticleActionTypes = 'REQ_ARTICLES_COMPLETE'
    export const REQUEST_ARTICLES_ERROR: ArticleActionTypes = 'REQ_ARTICLES_ERROR'
}

export type ArticleAction =
    RequestArticles |
    RequestArticlesStart |
    RequestArticlesComplete |
    RequestArticleError

export interface RequestArticles extends FSAction<RequestArticlesPayload> {
    type: ArticleActionTypes,
    payload: RequestArticlesPayload
}

export interface RequestArticlesPayload {
    fetchArticleCondition: FetchArticleCondition
}

export interface RequestArticlesStart extends redux.Action {
    type: ArticleActionTypes,
}

export interface RequestArticlesComplete extends redux.Action {
    type: ArticleActionTypes,
    articles: Article[]
}

export interface RequestArticleError extends redux.Action {
    type: ArticleActionTypes,
    message: string,
}


// === action creator =================
export const actionCreators = {
    requestArticles: (fetchArticleCondition: FetchArticleCondition) => {
        return <RequestArticles>{
            type: ArticleActionTypes.REQUEST_ARTICLES,
            payload: {
                fetchArticleCondition: fetchArticleCondition
            },
        }
    },

    requestArticlesStart: () => (
        <RequestArticlesStart>{
            type: ArticleActionTypes.REQUEST_ARTICLES_START,
        }),

    requestArticlesComplete: (articles: Article[]) => (
        <RequestArticlesComplete>{
            type: ArticleActionTypes.REQUEST_ARTICLES_COMPLETE,
            articles
        }),

    fetchArticleError: (message: string) => (
        <RequestArticleError>{
            type: ArticleActionTypes.REQUEST_ARTICLES_ERROR,
            message
        }),
}

function* fetchArticles(action: ArticleAction) {
    yield put(actionCreators.requestArticlesStart())
    const articles = yield call(api.saga.articles.fetchArticles)
    yield put(actionCreators.requestArticlesComplete(articles))
}


export function* requestArticleSagaWatcher() {
    yield takeLatest(ArticleActionTypes.REQUEST_ARTICLES, fetchArticles)
}

