import { grpc, Code, Metadata } from "grpc-web-client";

import { RelAssociation, ColumnType, Activity, Order, Coord, WidthHeight, Entity, Column, EntityColumnAttributes, EnumColumnAttribute, StringColumnAttribute, NumberColumnAttribute, Rel, RelationAttribute, Move, CoordWH, Transform } from "grpc/erd_pb";
import { grpcConnection } from "./api"

//import { RelationService, ActivityService } from "grpc/erd_pb_service";

//export function addRelation(rel: Rel) {
//    grpc.unary(RelationService.AddRelation, {
//        request: rel,
//        host: grpcConnection.url,
//        onEnd: (res: grpc.UnaryOutput<Activity>) => {
//            const { status, statusMessage, headers, message } = res
//
//						//TODO(taco) add to activity list
//            console.debug('-- add rel --')
//            console.debug(status)
//            console.debug(message)
//        }
//    })
//}
//
