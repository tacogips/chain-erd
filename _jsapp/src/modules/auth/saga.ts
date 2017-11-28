import { AuthActionTypes, actionCreators, AuthAction ,AuthenticationOpt } from './actions'
import { Reducer } from 'redux'
import { call, put, takeEvery, takeLatest, take, select } from 'redux-saga/effects'
import { newRelation } from 'grpc/util/relation'

import { Authed } from 'grpc/auth_pb'
import * as authApi from 'grpc/api/auth_api'
import * as streamApi from 'grpc/api/stream_api'

import { List } from 'immutable'
import { RootState } from 'modules/rootReducer'

import {  StreamPayload } from "grpc/stream_pb";

function* auth() {
	try{
		const authed = yield call(authApi.authenticatePromise)

   	yield put(actionCreators.authenticateSuccess(authed))

	}catch(err){
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


