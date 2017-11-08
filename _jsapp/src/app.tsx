import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'
import LatestArticleList from './containers/LatestAritlceList'
import { Stage, Layer, Rect, Group } from 'react-konva'

const initialState = {}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)


class MyRect extends React.Component<{}, any>{
    state = { color: 'green' };

    handleClick = () => {
        // window.Konva is a global variable for Konva framework namespace
        ///this.setState({
        ///  color: window.Konva.Util.getRandomColor()
        ///});
    }

    render() {
        return (
            <Rect
                x={10}
                y={10}
                width={50}
                height={50}
                fill={this.state.color}
                shadowBlur={5}
                onClick={this.handleClick}
            />
        );
    }
}

class App extends React.Component<{}, any> {
    render() {
        return (
            <Provider store={store}>
                <Stage width={700} height={700}>
                    <Layer>
                        <MyRect />
                    </Layer>
                </Stage>
            </Provider>
        )
    }
}

render(<App />, document.getElementById('app'))

