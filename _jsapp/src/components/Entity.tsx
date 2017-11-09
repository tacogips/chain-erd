import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import   * as Konva from 'konva'
import { Stage, Layer, Rect, Group, Circle } from 'react-konva'

export interface EntityProps {
		id:string
    x: number
    y: number
    width: number
    height: number
    color?: string
    onDragEnd?: () => void
}

export class Entity extends React.Component<EntityProps, {}>{
		//TODO(tacogips) if defined this type as "Reat", Konva.Rect methods will not found? check out after react 16.1 and its typedefinision released
    private refRect: any

    constructor(props?: EntityProps, context?: any) {
        super(props, context)
    }

    changeSize() {
    }

    onMouseOver = () =>{
        document.body.style.cursor = 'pointer';
    }

    onMouseOut = () =>{
        document.body.style.cursor = 'normal';
    }

    handleClick = () => {
				this.refRect.fill("red")
				this.refRect.draw()
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
                onMouseOut={this.onMouseOut}
                onClick={this.handleClick}
            />
        );
    }
}


