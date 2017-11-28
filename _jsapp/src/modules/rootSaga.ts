import { fork, all, takeLatest } from 'redux-saga/effects'

import { entityWatcher } from './entity/saga'
import { authWatcher } from './auth/saga'

export default function* rootSaga() {
    yield all([
        fork(entityWatcher),
        fork(authWatcher)
    ])
}


