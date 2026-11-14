import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Stage, Layer, Rect, Circle } from 'react-konva'
import { Map } from 'immutable'
import { Entity, CoordWH } from 'grpc/erd_pb'
import { positionFromEvent, EventPosition } from './util/event_position'

export interface AnchorProps {
    x: number,
    y: number,
    onMouseDownPre: (evt: any) => void
    transforming: (anchorPosition: EventPosition) => void
    transformed: (anchorPosition: EventPosition) => void
}

export interface AnchorState {
}

export class Anchor extends React.Component<AnchorProps, AnchorState>{
    private refCircle: any


    constructor(props?: AnchorProps, context?: any) {
        super(props, context)
    }

    onMouseOver = (evt: any) => {
        document.body.style.cursor = 'pointer'
        this.refCircle.setStrokeWidth(5)
        this.refCircle.draw()
    }

    onMouseOut = () => {
        document.body.style.cursor = 'default'
        this.refCircle.setStrokeWidth(1)
        this.refCircle.draw()
    }
    onMouseDown = (evt: any) => {
        this.props.onMouseDownPre(evt)
    }

    onDragMove = (evt: any) => {
        this.props.transforming(positionFromEvent(evt.evt))
    }

    onDragEnd = (evt: any) => {
        this.props.transformed(positionFromEvent(evt.evt))
    }

    render() {
        const { x, y } = this.props

        return (
            <Circle
                ref={(ref) => this.refCircle = ref}
                radius={5}
                fill={'#ddd'}
                stroke='black'
                strokeWidth={1}
                x={x}
                y={y}
                draggable={true}
								onMouseDown  ={this.onMouseDown}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onDragMove={this.onDragMove}
							  onDragEnd={this.onDragEnd}
					/>
        );
    }
}

