import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Stage, Layer, Rect, Group } from 'react-konva'
import { RelationOfEntities } from 'modules/relation'

import { RelLine } from 'components/RelLine'
import { EntityPanel } from 'containers/EntityPanel'
import { Map } from 'immutable'

import { Entity } from 'grpc/erd_pb'
import { positionFromEvent, EventPosition } from './util/event_position'

export enum CanvasClickAction {
    CREATE_NEW_ENTITY,
}

export interface CanvasProps {
    width: number,
    height: number,
    entities?: Map<string, Entity>
    currentSelectEntities?: Map<string, Entity>
    relationOfEntities?: RelationOfEntities
    mouseOverPointer?: string
    clickAction?: CanvasClickAction,
    onClick?: (
        canvasClickAciton: CanvasClickAction,
        canvasPosition: EventPosition) => void
}

export class Canvas extends React.Component<CanvasProps, {}>{
    private stage: any
    private refMainLayer: any
    private refFrontLayer: any

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

        const canvasPosition = positionFromEvent(evtVal)

        this.props.onClick(this.props.clickAction, canvasPosition)
    }

    redraw = () => {
        this.refMainLayer.draw()
    }

    render() {

        //TODO(tacogips) very slow when make selected entity on another layer to show forefront;.
        const entities = this.props.entities.valueSeq()
            .map((entity: Entity) => {
                return <EntityPanel key={entity.getObjectId()} entity={entity} />
            })

        const rels = this.props.relationOfEntities.map().valueSeq().map((rel) => {
            const beginEntity = this.props.entities.get(rel.getPointBegin().getEntityObjectId())
            const endEntity = this.props.entities.get(rel.getPointEnd().getEntityObjectId())

            return <RelLine key={rel.getObjectId()} rel={rel}
                beginEntity={beginEntity}
                endEntity={endEntity} />
        })

        console.debug("canvas rerenderd")

        const { width, height } = this.props

        //TODO(taco) better off render relations on another stage or layer? to reduce canvas rerender cost>
        return (
            <Stage
                ref={(ref) => this.stage = ref}
                width={width}
                height={height}
                onContentMouseOver={this.onMouseOver}
                onContentMouseOut={this.onMouseOut}
                onContentClick={this.onClickEvent} >
                <Layer ref={(ref) => this.refMainLayer = ref}>
										{rels}
                    {entities}
                </Layer>
            </Stage>
        );


    }
}

