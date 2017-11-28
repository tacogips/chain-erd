import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer, RootState } from 'modules/rootReducer'
import { actionCreators as authActionCreators} from 'modules/auth'
import rootSaga from 'modules/rootSaga'
import { Stage, Layer, Group } from 'react-konva'
import { AppComponent, AppProps} from 'components/AppComponent'
import { connect, Dispatch } from 'react-redux'

const mapStateToProps = (state: RootState, ownProps: AppProps) => (<AppProps>{
    ...ownProps,
})

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: AppProps) => (<AppProps>{
    ...ownProps,
    onAppInit: () => {
      return dispatch(authActionCreators.authentication())
    }
})

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)

