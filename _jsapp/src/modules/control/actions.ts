import * as redux from 'redux'
import { FSAction, EmptyAction } from 'modules/base/fsa'
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'


//=== action types ============
// TODO enum にしたいけど redux sagaのtakeLatesに渡すredux-saga.ActionType
// (type ActionType = string | number | symbol;)
// との互換がないので、文字列で定義してnamespaceで束縛だけしてある
export type ControlActionTypes = string
export module ControlActionTypes {
    export const PREPARE_NEW_ENTIY: ControlActionTypes = 'PREPARE_NEW_ENTIY'
    export const FINISH_CREATE_ENTITY: ControlActionTypes = 'FINISH_CREATE_ENTITY'
    export const CANCEL_ACTION: ControlActionTypes = 'CANCEL_ACTION'

    export const CONNECTING_ONE_TO_MENY_REL: ControlActionTypes = 'CONNECTING_ONE_TO_MENY_REL'
    export const FINISH_CONNECTING_REL: ControlActionTypes = 'FINISH_CONNECTING_REL'
}

export interface EntityActionOption {
    repeat: boolean
}

export interface PrepareNewEntity extends FSAction<EntityActionOption> {
    type: ControlActionTypes,
    payload: EntityActionOption
}

export interface CancelAction extends EmptyAction {
    type: ControlActionTypes
}


export interface ConnectingOneToMenyRel extends EmptyAction {
    type: ControlActionTypes,
}

export interface FinishConnectingRel extends EmptyAction {
    type: ControlActionTypes,
}


export type ControlAction = PrepareNewEntity

// === action creator =================
export const actionCreators = {
    prepareToCreateEntity: (repeat: boolean) => {
        return <PrepareNewEntity>{
            type: ControlActionTypes.PREPARE_NEW_ENTIY,
            payload: {
                repeat: repeat
            }
        }
    },

    finishCreateEntity: () => {
        return <PrepareNewEntity>{
            type: ControlActionTypes.FINISH_CREATE_ENTITY,
        }
    },

    cancelAction: () => {
        return <CancelAction>{
            type: ControlActionTypes.CANCEL_ACTION,
        }
    },

    connectingOneToMenyRel: () => {
        return <CancelAction>{
            type: ControlActionTypes.CONNECTING_ONE_TO_MENY_REL,
        }
    },

    finishConnectingRel: () => {
        return <CancelAction>{
            type: ControlActionTypes.FINISH_CONNECTING_REL,
        }
    }
}

