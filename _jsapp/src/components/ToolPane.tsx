import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

export interface ToolPaneProps {
    preparingCreateEntity?: boolean
    pushEntityButton?: () => void
}

export class ToolPane extends React.Component<ToolPaneProps, {}>{

    constructor(props?: ToolPaneProps, context?: any) {
        super(props, context)
    }

    render() {
        return (
            <div>
                <button onClick={this.props.pushEntityButton}>entity</button>
            </div>
        );
    }
}
