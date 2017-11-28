import { AuthActionTypes, actionCreators, AuthAction } from './actions'
import { Reducer } from 'redux'
import { call, put, takeEvery, takeLatest, take, select } from 'redux-saga/effects'
import { newRelation } from 'grpc/util/relation'

import { Authed } from 'grpc/auth_pb'
import * as auth_api from 'grpc/api/auth_api'

import { List } from 'immutable'
import { RootState } from 'modules/rootReducer'

function* auth() {
	try{
		const authed = yield call(auth_api.authenticatePromise)

   	yield put(actionCreators.authenticateSuccess(authed))

	}catch(err){
		//TODO (taco) do something if auth failed
		console.error(err)
	}
}

//TODO(taco) move to package other than auth
//function* connectStreamServer() {
//
//    yield put(actionCreators.authentication())
//
//    //yield put(actionCreators.seqChoiceEntities(objectId))
//
//    const latestState = <RootState>(yield select())
//
//    //if (latestState.entity.seqentialChoiceEntities.size >= 2) {
//    //TODO (taco) add rel
//    yield put(actionCreators.finishConnectingRel())
//    //}
//}

export function* authWatcher() {
    yield takeLatest(AuthActionTypes.AUTHENTICATE, auth)
}


