import * as React from 'react'
import { render } from 'react-dom'
import { Provider ,Store} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer, RootState } from 'modules/rootReducer'
import { Stage, Layer, Group } from 'react-konva'
import { Canvas } from 'containers/Canvas'
import { ToolPane } from 'containers/ToolPane'


export interface AppProps{
	store: Store<RootState>
	onAppInit?:()=>void
}

export class AppComponent extends React.Component<AppProps, any> {
		componentDidMount(){
			this.props.onAppInit()
		}
    render() {
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

