import { grpc, Code, Metadata } from "grpc-web-client";

import { RelAssociation, ColumnType, Activity, Order, Coord, WidthHeight, Entity, Column, EntityColumnAttributes, EnumColumnAttribute, StringColumnAttribute, NumberColumnAttribute, Rel, RelationAttribute, Move, CoordWH, Transform } from "grpc/erd_pb";
import { grpcConnection } from "./api"

import { EntityService, ActivityService } from "grpc/erd_pb_service";

export function createEntity(entity: Entity) {
    grpc.unary(EntityService.CreateEntity, {
        request: entity,
        host: grpcConnection.url,
        onEnd: (res: grpc.UnaryOutput<Activity>) => {
            const { status, statusMessage, headers, message } = res

						//TODO(taco) add to activity list
            console.debug('-- create entity--')
            console.debug(status)
            console.debug(message)
        }
    })
}


export function moveEntity(move: Move) {
    grpc.unary(EntityService.MoveEntity, {
        request: move,
        host: grpcConnection.url,
        onEnd: (res: grpc.UnaryOutput<Activity>) => {
            const { status, statusMessage, headers, message } = res

						//TODO(taco) add to activity list
            console.debug('-- move entity--')
            console.debug(status)
            console.debug(message)
        }
    })
}


export function transformEntity(transform: Transform) {
    grpc.unary(EntityService.TransformEntity, {
        request: transform,
        host: grpcConnection.url,
        onEnd: (res: grpc.UnaryOutput<Activity>) => {
            const { status, statusMessage, headers, message } = res

						//TODO(taco) add to activity list
            console.debug('-- transform entity --')
            console.debug(status)
            console.debug(message)
        }
    })
}

