
import * as redux from 'redux'
import { FSAction ,EmptyAction} from 'modules/base/fsa'
import { Article } from 'modules/models/Article'
import * as api from 'modules/api' //TODO 何故か modules/apiだとエラー
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'


//=== action types ============
// TODO enum にしたいけど redux sagaのtakeLatesに渡すredux-saga.ActionType
// (type ActionType = string | number | symbol;)
// との互換がないので、文字列で定義してnamespaceで束縛だけしてある
export type ControlActionTypes = string
export module ControlActionTypes {
    export const PREPARE_NEW_ENTIY: ControlActionTypes = 'PREPARE_NEW_ENTIY'
}


export interface PrepareNewEntity extends EmptyAction {
    type: ControlActionTypes,
}

export type ControlAction = PrepareNewEntity

// === action creator =================
export const actionCreators = {
    prepareNewEntity: () => {
        return <PrepareNewEntity>{
            type: ControlActionTypes.PREPARE_NEW_ENTIY,
        }
    },
}

