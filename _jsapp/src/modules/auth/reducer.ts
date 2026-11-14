import * as actions from './actions'
import { Reducer } from 'redux'
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

import { Authentication, AuthenticateSuccess } from "./actions";
import { Authed } from 'grpc/auth_pb'

export interface AuthState {
    isAuthed: boolean
    authInfo?: Authed
}

export const initialState: AuthState = {
    isAuthed: false,
    authInfo: null
}

// reducer
export const authReducer: Reducer<AuthState> = (state: AuthState = initialState, action: actions.AuthAction) => {
    switch (action.type) {

        case actions.AuthActionTypes.AUTHENTICATE_SUCCSESS:
            const authenticationSuccess = <AuthenticateSuccess>action

            return {
                ...state,
                isAuthed: true,
                authInfo: authenticationSuccess.payload,
            }

        default:
            return state
    }
}


