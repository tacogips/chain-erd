import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Stage, Layer, Rect, Group } from 'react-konva'
import { EntityPanel } from './EntityPanel'
import { Entities } from 'modules/entity'
import { Entity } from 'grpc/erd_pb'

export interface CanvasProps {
    width: number,
    height: number,

    entities?: Entities
    onClick?: () => void
}

export interface CanvasState { }

export class Canvas extends React.Component<CanvasProps, CanvasState>{
    private stage: any

    constructor(props?: CanvasProps, context?: any) {
        super(props, context)
    }

    onClickEvent = (evt: any) => {
        console.log(evt)
    }

    render() {

			//TODO(tacogips) Is there another way to iterate a interface?
        const entities = Object.keys(this.props.entities).map((entityId: string) => {
						const entity = this.props.entities[entityId]
            return <EntityPanel entity={entity} />
        })

        return (
            <Stage
                ref={(ref) => this.stage = ref}
                width={this.props.width}
                height={this.props.height}
                onContentClick={this.onClickEvent} >
                <Layer>
                    entities
                </Layer>
            </Stage>
        );
    }
}



