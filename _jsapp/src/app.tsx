import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer, RootState } from './modules/rootReducer'
import rootSaga from './modules/rootSaga'
import { Stage, Layer, Group } from 'react-konva'
import { Canvas } from 'components/Canvas'
import { Entity } from 'components/Entity'
import { ToolPane } from './containers/ToolPane'

const initialState: RootState = {
    entities: null,
    rels: null
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

class App extends React.Component<{}, any> {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <ToolPane />
                    <Canvas width={700} height={700} />
                </div>
            </Provider>
        )
    }
}

render(<App />, document.getElementById('app'))

