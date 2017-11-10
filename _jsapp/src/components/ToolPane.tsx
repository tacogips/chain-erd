import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

export interface ToolPaneProps {
    selectEntity?: () => void
}

export class ToolPane extends React.Component<ToolPaneProps, {}>{
    constructor(props?: ToolPaneProps, context?: any) {
        super(props, context)
    }

    handleClick = () => {
			console.log("test")
    }

    render() {
        return (
           <div>
						<button>entity</button>
					</div>
        );
    }
}



