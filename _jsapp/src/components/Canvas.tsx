import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Stage, Layer, Rect, Group } from 'react-konva'
import { EntityPanel } from 'containers/EntityPanel'
import { Map } from 'immutable'

import { Entity } from 'grpc/erd_pb'
import {positionFromEvent,EventPosition} from './util/event_position'

export enum CanvasClickAction {
    CREATE_NEW_ENTITY,
}

export interface CanvasProps {
    width: number,
    height: number,
    entities?: Map<string, Entity>
    mouseOverPointer?: string
    clickAction?: CanvasClickAction,
    onClick?: (
        canvasClickAciton: CanvasClickAction,
        canvasPosition: EventPosition) => void
}

export class Canvas extends React.Component<CanvasProps, {}>{
    private stage: any
    private refMainLayer: any

    constructor(props?: CanvasProps, context?: any) {
        super(props, context)
    }

    onMouseOver = () => {
        if (!this.props.mouseOverPointer) {
            document.body.style.cursor = 'default';
            return
        }
        document.body.style.cursor = this.props.mouseOverPointer;
    }

    onMouseOut = () => {
        document.body.style.cursor = 'default';
    }

    onClickEvent = (evt: any) => {
        if (this.props.onClick == null) {
            return
        }
        let evtVal = evt.evt
        const nullOrZero = (v: any) => {
            return (!v) ? 0 : +v
        }

        const canvasPosition=  positionFromEvent(evtVal)

        this.props.onClick(this.props.clickAction, canvasPosition)
    }

    redraw = () => {
        this.refMainLayer.draw()
    }

    render() {
        //TODO(tacogips) Is there another way to iterate a interface?
        const entities = this.props.entities.valueSeq().map((entity: Entity) => {
            return <EntityPanel key={entity.getObjectId()} entity={entity} />
        })
        const { width, height } = this.props

        return (
            <Stage
                ref={(ref) => this.stage = ref}
                width={width}
                height={height}
                onContentMouseOver={this.onMouseOver}
                onContentMouseOut={this.onMouseOut}
                onContentClick={this.onClickEvent} >
                <Layer ref={(ref) => this.refMainLayer = ref}>
                    {entities}
                </Layer>
            </Stage>
        );


    }
}

