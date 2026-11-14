import * as React from 'react'
import { render } from 'react-dom'
import { Provider, Store } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer, RootState } from 'modules/rootReducer'
import { Stage, Layer, Group } from 'react-konva'
import { Canvas } from 'containers/Canvas'
import { ToolPane } from 'containers/ToolPane'
import { Authed } from 'grpc/auth_pb'


export interface AppProps {
    store: Store<RootState>

    alreadyConnectedToStream?: boolean
    isAuthed?: boolean,
    authed?: Authed

    onAppInit?: () => void
    onConnectStreaming?: (authed: Authed) => void
}

export class AppComponent extends React.Component<AppProps, any> {
    componentDidMount() {
        this.props.onAppInit()
    }

    render() {

        const { alreadyConnectedToStream, onConnectStreaming, isAuthed ,authed} = this.props
        // TODO(taco) move render() cause this is not about rendering but background process
        if (!alreadyConnectedToStream && isAuthed) {
            onConnectStreaming(authed)
        }

        return (
            <Provider store={this.props.store}>
                <div>
                    <ToolPane />
                    <Canvas width={1300} height={1000} />
                </div>
            </Provider>
        )
    }
}

