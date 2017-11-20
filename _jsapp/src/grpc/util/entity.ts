
import { Entity, Coord, CoordWH, WidthHeight, ColumnType } from 'grpc/erd_pb'

import { DefaultlSize, DefaultlEntityColor } from 'modules/entity'
import { newCoord } from './coord'
import { newColumn, newStringColumnAttr, newNumberColumnAttr } from './column'

import * as uuidv4 from 'uuid/v4'

export function newEntity(coord: Coord): Entity {
    const newEntity = new Entity()

    newEntity.setObjectId(uuidv4())

    newEntity.setCoord(coord)

    const wh = new WidthHeight()
    wh.setW(DefaultlSize.W)
    wh.setH(DefaultlSize.H)
    newEntity.setWidthHeight(wh)

    newEntity.setName("NewEntity")

    //TODO(taco) mock column--------------------
    const mocIntAttr = newNumberColumnAttr(
        { pk: false, fk: false, unique: false, notNull: false },
        18, 0, false, 1.0)
    const col1 = newColumn(uuidv4(), "column1", ColumnType.INT, mocIntAttr)
    newEntity.addColumns(col1)

    const mocStrAttr = newStringColumnAttr({ pk: false, fk: false, unique: false, notNull: false }, 256, "hogege")
    const col2 = newColumn(uuidv4(), "column2", ColumnType.VARCHAR, mocStrAttr)
    newEntity.addColumns(col2)
    //TODO(taco) mock column end  --------------------

    newEntity.setColor(DefaultlEntityColor.DEFAULT_ENTITY_COLOR)
    return newEntity
}

export function getCentor(entity: Entity): Coord {
    const { x, y } = entity.getCoord().toObject()
    const { w, h } = entity.getWidthHeight().toObject()

    const centerX = x + w / 2
    const centerY = y + h / 2

    return newCoord(centerX, centerY)
}

