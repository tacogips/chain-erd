import * as redux from 'redux'
import { FSAction, EmptyAction } from 'modules/base/fsa'
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'

import {Authed} from 'grpc/auth_pb'

//=== action types ============
// TODO enum にしたいけど redux sagaのtakeLatesに渡すredux-saga.ActionType
// (type ActionType = string | number | symbol;)
// との互換がないので、文字列で定義してnamespaceで束縛だけしてある
export type AuthActionTypes = string
export module AuthActionTypes {
    export const AUTHENTICATE: AuthActionTypes  = 'AUTHENTICATE'
    export const AUTHENTICATE_SUCCSESS: AuthActionTypes  = 'AUTHENTICATE_SUCCSESS'
    export const LOGOUT: AuthActionTypes  = 'LOGOUT'
}

// TODO()
export interface Authentication extends EmptyAction  {
    type: AuthActionTypes ,
}

export interface AuthenticateSuccess extends FSAction<Authed>  {
    type: AuthActionTypes ,
		payload: Authed,
}

export interface Logout extends EmptyAction {
    type: AuthActionTypes
}

//export type AuthAction = Authentication | AuthenticateSuccess  | Logout
export type AuthAction = Authentication | AuthenticateSuccess  | Logout

// === action creator =================
export const actionCreators = {
    authentication: () => {
        return <Authentication>{
            type: AuthActionTypes.AUTHENTICATE,
        }
    },

	authenticateSuccess: (authed:Authed) => {
        return <AuthenticateSuccess>{
            type: AuthActionTypes.AUTHENTICATE_SUCCSESS,
					  payload:authed,
        }
    },


    logout: () => {
        return <Logout>{
            type: AuthActionTypes.LOGOUT,
        }
    },
}

