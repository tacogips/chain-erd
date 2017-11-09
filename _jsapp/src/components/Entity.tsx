import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Stage, Layer, Rect, Group, Circle } from 'react-konva'

export interface EntityProps {
    x: number
    y: number
    width: number,
    height: number,
    color: string,
    onDragEnd?: () => void
}

export class Entity extends React.Component<EntityProps, {}>{
    private refRect: Rect

    constructor(props?: EntityProps, context?: any) {
        super(props, context)
    }

    changeSize() {
    }

    onMouseOver = () =>{
        document.body.style.cursor = 'pointer';
    }

    handleClick = () => {
        console.log("14124")
				this.refRect.fill("red");
    }

    render() {
        return (
            <Rect
                x={this.props.x}
                y={this.props.y}
                width={this.props.width}
                height={this.props.height}
                fill={this.props.color}
                shadowBlur={1}
                draggable={true}
                ref={(ref)=> this.refRect = ref}
                onMouseOver={this.onMouseOver}
                onClick={this.handleClick}
            />
        );
    }
}


