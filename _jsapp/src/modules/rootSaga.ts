import { fork, all, takeLatest } from 'redux-saga/effects'
//import { requestArticleSagaWatcher } from './articles'
//import { ArticleActionTypes } from './articles/actions'

export default function* rootSaga() {
    yield all([
        //fork(requestArticleSagaWatcher)
    ])
}


