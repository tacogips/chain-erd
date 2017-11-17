import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Stage, Layer, Rect, Circle } from 'react-konva'
import { Map } from 'immutable'

import { Entity } from 'grpc/erd_pb'

export interface AnchorProps {
    x: number,
    y: number,
    onClick?: () => void
    onDragMove?: () => void
    redraw: () => void
}

export interface AnchorState {
    previousMousePointer: string
}

export class Anchor extends React.Component<AnchorProps, AnchorState>{
    private refCircle: any

    private circleStroke = 2 //TODO(tacogips) tobe const

    constructor(props?: AnchorProps, context?: any) {
        super(props, context)
    }

    onMouseOver = (evt: any) => {
        console.log(evt)

        this.setState({ previousMousePointer: document.body.style.cursor })
        document.body.style.cursor = 'pointer'
        this.refCircle.setStrokeWidth(this.circleStroke + 4)
        this.refCircle.draw()
        this.props.redraw()
    }

    onMouseOut = () => {
        //document.body.style.cursor = this.state.previousMousePointer
        //this.refCircle.setStrokeWidth(this.circleStroke)
        //this.refCircle.draw()
        //this.props.redraw()
    }

    render() {
        const { x, y, onDragMove } = this.props

        return (
            <Circle
                ref={(ref) => this.refCircle = ref}
                radius={3}
                fill={'#ddd'}
                stroke='black'
                strokeWidth={this.circleStroke}
                x={x}
                y={y}
                draggable={true}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onDragMove={onDragMove} />
        );
    }
}

