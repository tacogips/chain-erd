import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'
import LatestArticleList from './containers/LatestAritlceList'

const initialState = {}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

class App extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <LatestArticleList />
                </MuiThemeProvider>
            </Provider>
        )
    }
}

render(<App />, document.getElementById('app'))
