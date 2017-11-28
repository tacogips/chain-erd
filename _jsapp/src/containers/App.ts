import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer, RootState } from 'modules/rootReducer'
import { actionCreators as authActionCreators } from 'modules/auth'
import { actionCreators as entityActionCreators } from 'modules/entity'
import { actionCreators as relActionCreators } from 'modules/relation'

import rootSaga from 'modules/rootSaga'
import { Stage, Layer, Group } from 'react-konva'
import { AppComponent, AppProps } from 'components/AppComponent'
import { connect, Dispatch } from 'react-redux'
import * as streamApi from 'grpc/api/stream_api'

import { Authed } from 'grpc/auth_pb'
import { StreamPayload } from 'grpc/stream_pb'

const mapStateToProps = (state: RootState, ownProps: AppProps) => (<AppProps>{
    ...ownProps,
    alreadyConnectedToStream: state.control.alreadyConnectedToStream,
    isAuthed: state.auth.isAuthed,
    authed: state.auth.authInfo
})

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: AppProps) => (<AppProps>{
    ...ownProps,
    onAppInit: () => {
        return dispatch(authActionCreators.authentication(true))
    },

    onConnectStreaming: (authed: Authed) => {
        // async call
        streamApi.connectToStream(authed, (payload: StreamPayload) => {
            //dispatch(authActionCreators.authentication(true))
        })
    }
})




export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)

