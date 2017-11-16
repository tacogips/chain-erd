import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

export interface ToolPaneProps {
    preparingCreateEntity?: boolean
    onCreateSingleEntityButton?: () => void
    onRepeatCreateEntityButton?: () => void
    onCancelAction?: () => void
}

export class ToolPane extends React.Component<ToolPaneProps, {}>{

    constructor(props?: ToolPaneProps, context?: any) {
        super(props, context)
    }

    render() {
        return (
            <div>
                <button onClick={this.props.onCreateSingleEntityButton}>
                    New Entity
								</button>
                <button onClick={this.props.onRepeatCreateEntityButton}>
                    Repeatedly New Entity
								</button>

                <button onClick={this.props.onCancelAction}>
                   Cancel
								</button>
            </div>
        );
    }
}
