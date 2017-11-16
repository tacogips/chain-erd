import { EntityActionTypes, actionCreators, EntityAction } from './actions'
import { actionCreators as controlActionCreators } from 'modules/control/actions'
import { Reducer } from 'redux'
import { call, put, takeEvery, takeLatest, take, select } from 'redux-saga/effects'
import { RootState } from 'modules/rootReducer'

function* onCreateEntity(action: EntityAction) {
    const state = <RootState>(yield select())
    if (!state.control.repeatAction) {
        yield put(controlActionCreators.finishCreateEntity())
    }
}

export function* createEntityWatcher() {
    yield takeLatest(EntityActionTypes.CREATE_NEW_ENTITY, onCreateEntity)
}

