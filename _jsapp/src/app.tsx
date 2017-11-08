import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'
import LatestArticleList from './containers/LatestAritlceList'
import { Stage, Layer,  Group } from 'react-konva'
import { Entity } from 'components/Entity'


const initialState = {}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)



//    x: number
//    y: number
//	  width:number,
//	  height:number,
//		color: string

class App extends React.Component<{}, any> {
    render() {
        return (
            <Provider store={store}>
                <Stage width={700} height={700}>
                    <Layer>
                        <Entity
													x={10}
													y={200}
													width={100}
													height={200}
												  color="green" />
                    </Layer>
                </Stage>
            </Provider>
        )
    }
}

render(<App />, document.getElementById('app'))

