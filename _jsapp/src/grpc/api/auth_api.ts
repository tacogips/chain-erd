import { grpc, Code, Metadata } from "grpc-web-client";

import { RelAssociation, ColumnType, Activity, Order, Coord, WidthHeight, Entity, Column, EntityColumnAttributes, EnumColumnAttribute, StringColumnAttribute, NumberColumnAttribute, Rel, RelationAttribute, Move, CoordWH, Transform } from "grpc/erd_pb";
import { Authed, AuthRequest } from "grpc/auth_pb";

import { grpcConnection } from "./api"
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";


import { AuthService } from "grpc/auth_pb_service";

export function authenticate() {
    const authRequest = new AuthRequest()

    grpc.unary(AuthService.Auth, {
        request: authRequest,
        host: grpcConnection.url,
        onEnd: (res: grpc.UnaryOutput<Authed>) => {
            const { status, statusMessage, headers, message } = res
            console.debug(status)
            console.debug(message)
        }
    })
}
