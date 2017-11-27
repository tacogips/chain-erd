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
            console.debug(status)
            console.debug(message)
        }
    })
}

