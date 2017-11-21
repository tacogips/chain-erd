import { Rel, Coord, Entity, RelAssociation, RelPoint, RelationAttribute } from 'grpc/erd_pb'

import * as uuidv4 from 'uuid/v4'

export function newRelation(
    begin: Entity,
    end: Entity,
    beginAssociation: RelAssociation,
    endAssociation: RelAssociation): Rel {

    const newRel = new Rel()
    newRel.setObjectId(uuidv4())

    const beginPoint = new RelPoint()
    beginPoint.setEntityObjectId(begin.getObjectId())
    beginPoint.setAssociation(beginAssociation)
    newRel.setPointBegin(beginPoint)

    const endPoint = new RelPoint()
    endPoint.setEntityObjectId(end.getObjectId())
    endPoint.setAssociation(endAssociation)
    newRel.setPointEnd(endPoint)

    newRel.setAttribute(newRelationAttribute([]))

    return newRel
}

export function newRelationAttribute(bentPoints: Coord[]): RelationAttribute {
    const attr = new RelationAttribute()
    attr.setBentPointsList(bentPoints)
    return attr
}

