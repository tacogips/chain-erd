import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Stage, Layer, Rect, Group  } from 'react-konva'


export interface EntityProps {
    x: number
    y: number
	  width:number,
	  height:number,
		color: string
}

export class Entity extends React.Component<EntityProps , {}>{

    changeSize() {
        //const rect = (<Konva.Node>this.refs.rect);

        //// to() is a method of `Konva.Node` instances
        //rect.to({
        //        scaleX: Math.random() + 0.8,
        //    scaleY: Math.random() + 0.8,
        //    duration: 0.2
        //});
    }

    handleClick = () => {
        // window.Konva is a global variable for Konva framework namespace
        ///this.setState({
        ///  color: window.Konva.Util.getRandomColor()
        ///});
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
                onClick={this.handleClick}
            />
        );
    }
}


