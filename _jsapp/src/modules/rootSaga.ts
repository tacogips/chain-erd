import { fork, all, takeLatest } from 'redux-saga/effects'

import { createEntityWatcher } from './entity/saga'

export default function* rootSaga() {
    yield all([
        fork(createEntityWatcher)
    ])
}


