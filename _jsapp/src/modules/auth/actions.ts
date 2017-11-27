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
    export const AUTHENTICATED: AuthActionTypes  = 'AUTHENTICATED'
    export const LOGOUT: AuthActionTypes  = 'LOGOUT'
}

// TODO()
export interface Authentication extends EmptyAction  {
    type: AuthActionTypes ,
}

export interface Authenticated extends FSAction<Authed>  {
    type: AuthActionTypes ,
}

export interface Logout extends EmptyAction {
    type: AuthActionTypes
}

export type AuthAction = Authentication  | Logout

// === action creator =================
export const actionCreators = {
    authentication: (repeat: boolean) => {
        return <Authentication>{
            type: AuthActionTypes.AUTHENTICATE,
            payload: {
                repeat: repeat
            }
        }
    },

    logout: () => {
        return <Logout>{
            type: AuthActionTypes.LOGOUT,
        }
    },
}

