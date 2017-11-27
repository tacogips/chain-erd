import * as actions from './actions'
import { Reducer } from 'redux'
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export interface AuthState {
    is_authed: boolean
    authInfo?: boolean
}

export const initialState: AuthState = {
    is_authed: false,
    authInfo: null
}

// reducer
export const controlReducer: Reducer<AuthState> = (state: AuthState= initialState, action: actions.AuthAction) => {
    switch (action.type) {
        case actions.AuthActionTypes.AUTHENTICATE:
				  return state

        case actions.AuthActionTypes.AUTHENTICATE:
				  return state

        default:
            return state
    }
}


