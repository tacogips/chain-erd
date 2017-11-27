import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer, RootState } from './modules/rootReducer'
import rootSaga from './modules/rootSaga'
import { Stage, Layer, Group } from 'react-konva'
import { Canvas } from 'containers/Canvas'
import { App } from 'containers/App'

const initialState: RootState = {}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

render(<App store={store}/>, document.getElementById('app'))

