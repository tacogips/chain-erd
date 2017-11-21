import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as Konva from 'konva'
import { Stage, Layer, Rect, Group, Circle, Text } from 'react-konva'
import { Map } from 'immutable'
import { Entity, Rel, Coord, Move, Transform, CoordWH, Column, ColumnType } from 'grpc/erd_pb'
import { newCoord, newCoordWH } from 'grpc/util/coord'
import { isNumberCol, isStringCol, isEnumCol, columnTypeName } from 'grpc/util/column'
import { newTransform } from 'grpc/util/transform'
import { newMove } from 'grpc/util/move'
import { Anchor } from './Anchor'
import { positionFromEvent, EventPosition, PositionFunction } from './util/event_position'

export interface ColumnsInEntityPanelProps {
    entity: Entity
    x: number,
    y: number,
    w: number,
    h: number,
}

export interface ColumnsInEntityPanelState {
}

class ColumnLine {
    constructor(private column: Column) {

    }

    toText(): string {
        if (isNumberCol(this.column)) {
            return this.toNumberColumnText()
        } else if (isStringCol(this.column)) {
            return this.toStrColumnText()
        } else if (isEnumCol(this.column)) {
            return this.toEnumColumnText()
        } else {
            console.error(`invalid column ${this.column}`)
        }
        return "[invalid]"
    }


    private commonText(): string {
        const attr = this.column.getAttrs()
        const { isPk, isFk, isUnique, isNotNull } = attr.toObject()

        let result = ""
        //TODO(taco) dowes typescript has StringBuilder?

        if (isPk) {
            result = result + "<PK>"
        }

        if (isFk) {
            result = result + "<FK>"
        }

        if (isUnique) {
            result = result + "<U>"
        }

        if (isNotNull) {
            result = result + "<NN>"
        }

        return result
    }

    private toStrColumnText = () => {
        const name = this.column.getName()
        const tpe = columnTypeName(this.column.getType())
        const strAttr = this.column.getAttrs().getAttrString()
        const size = strAttr.getLength()

        return `${name}:${tpe}(${size}) [${this.commonText()}]`
    }

    private toEnumColumnText = () => {
        return ""
    }

    private toNumberColumnText = () => {
        const name = this.column.getName()
        const tpe = columnTypeName(this.column.getType())

        const numAttr = this.column.getAttrs().getAttrNumber()
        const size = `${numAttr.getLength()},${numAttr.getDecimal()}`

        return `${name}:${tpe}(${size}) [${this.commonText()}]`
    }


}

export class ColumnsInEntityPanel extends React.Component<ColumnsInEntityPanelProps, ColumnsInEntityPanelState>{
    //TODO(tacogips) if defined this type as "Reat", Konva.Rect methods will not found? check out after react 16.1 and its typedefinision released
    private refGroup: any

    constructor(props?: ColumnsInEntityPanelProps, context?: any) {
        super(props, context)
    }


    render() {
        const { x, y, w, h, entity } = this.props

        const columnHeight = 13;

        const columns = entity.getColumnsList().map((column, idx) => {
            const offsetY = 3
            const y = (columnHeight * idx) + offsetY
            const cl = new ColumnLine(column)
            return <Text key={column.getObjectId()}
                text={cl.toText()} y={y} width={w} height={columnHeight} />
        })

        return (
            <Group
                x={x}
                y={y}
                ref={(ref) => this.refGroup = ref} >
                {columns}

            </Group >
        );
    }



}

