import { Action } from 'redux'
import { ActionType } from 'redux-saga/effects'

//Flux Standard Actions
export interface FSAction<Payload> extends Action {
    type: ActionType
    payload: Payload
    error?: boolean
    errorMessage?: string
}


export interface EmptyAction extends Action {}
