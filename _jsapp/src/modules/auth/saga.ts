import { AuthActionTypes, actionCreators, AuthAction} from './actions'
import { actionCreators as controlActionCreators } from 'modules/control/actions'
import { actionCreators as relationActionCreators } from 'modules/relation/actions'
import { Reducer } from 'redux'
import { call, put, takeEvery, takeLatest, take, select } from 'redux-saga/effects'
import { newRelation } from 'grpc/util/relation'

import { RelAssociation } from 'grpc/erd_pb'

import { List } from 'immutable'
import { RootState } from 'modules/rootReducer'


function* auth( ) {

}

//TODO(taco) move to package other than auth
function* connectStreamServer(action: EntityAction) {

    yield put(relationActionCreators.addRelation(newRel))

    // if add relation
    if (currentState.entity.seqentialChoiceEntities.contains(objectId)) {
        return
    }

    yield put(actionCreators.seqChoiceEntities(objectId))

    const latestState = <RootState>(yield select())

    console.debug("choice")
    console.debug(latestState.entity.seqentialChoiceEntities.size)

    if (latestState.entity.seqentialChoiceEntities.size >= 2) {
        //TODO (taco) add rel
        const beginEntityObjId = latestState.entity.seqentialChoiceEntities.get(0)
        const beginEntity = latestState.entity.entities.get(beginEntityObjId)

        const endEntityObjId = latestState.entity.seqentialChoiceEntities.get(1)
        const endEntity = latestState.entity.entities.get(endEntityObjId)

        const newRel = newRelation(
            beginEntity,
            endEntity,
            RelAssociation.One,
            RelAssociation.Many)

        yield put(relationActionCreators.addRelation(newRel))
        yield put(actionCreators.cancelSelection())
        yield put(controlActionCreators.finishConnectingRel())
    }

}

export function* entityWatcher() {
    yield takeLatest(EntityActionTypes.CREATE_NEW_ENTITY, onCreateEntity)
    yield takeLatest(EntityActionTypes.CREATE_NEW_ENTITY, onCreateEntity)
}


