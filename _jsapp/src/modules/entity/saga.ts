import { EntityActionTypes, actionCreators, EntityAction, SelectEntity } from './actions'
import { actionCreators as controlActionCreators } from 'modules/control/actions'
import { Reducer } from 'redux'
import { call, put, takeEvery, takeLatest, take, select } from 'redux-saga/effects'

import { List } from 'immutable'
import { RootState } from 'modules/rootReducer'

function* onCreateEntity(action: EntityAction) {
    const state = <RootState>(yield select())
    if (!state.control.repeatAction) {
        yield put(controlActionCreators.finishCreateEntity())
    }
}

export function* createEntityWatcher() {
    yield takeLatest(EntityActionTypes.CREATE_NEW_ENTITY, onCreateEntity)
    yield takeLatest(EntityActionTypes.SELECT_ENTITY, onSelectEntity)
    //TODO reset state when control action cancelled
}

function* onSelectEntity(action: EntityAction) {
    const currentState = <RootState>(yield select())
    const selectAction = <SelectEntity>action

    const objectId = selectAction.payload


    if (currentState.control.connectingOneToMenyRel) {
        if (currentState.entity.seqentialChoiceEntities.contains(objectId)) {
            return
        }

        yield put(actionCreators.seqChoiceEntities(objectId))

        const state = <RootState>(yield select())

        if (currentState.entity.seqentialChoiceEntities.size >= 2) {
          //TODO (taco) add rel

					yield put(controlActionCreators.finishConnectingRel())
        }

    } else {
        yield put(actionCreators.choiceEntities(objectId))
    }
}



