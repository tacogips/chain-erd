import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Stage, Layer, Rect, Group } from 'react-konva'
import { Entity } from './Entity'

export interface CanvasProps {
    width: number,
    height: number
}

export interface CanvasState { }

export class Canvas extends React.Component<CanvasProps, CanvasState>{
    constructor(props?: CanvasProps, context?: any) {
        super(props, context)
    }


    render() {
        return (
            <Stage width={this.props.width} height={this.props.height}>
                <Layer>
                    <Entity
												id={"testaaa"}
                        x={10}
                        y={200}
                        width={100}
                        height={200}
                        color="green" />
                </Layer>
            </Stage>
        );
    }
}


