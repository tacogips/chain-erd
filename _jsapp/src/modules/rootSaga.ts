import { fork, all, takeLatest } from 'redux-saga/effects'

import { entityWatcher } from './entity/saga'

export default function* rootSaga() {
    yield all([
        fork(entityWatcher)
    ])
}


