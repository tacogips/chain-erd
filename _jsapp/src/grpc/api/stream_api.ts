import { grpc, Code, Metadata, Request } from "grpc-web-client";

import { RelAssociation, ColumnType, Activity, Order, Coord, WidthHeight, Entity, Column, EntityColumnAttributes, EnumColumnAttribute, StringColumnAttribute, NumberColumnAttribute, Rel, RelationAttribute, Move, CoordWH, Transform } from "grpc/erd_pb";

import { Authed, AuthRequest } from "grpc/auth_pb";
import { StreamConnectReq, StreamPayload } from "grpc/stream_pb";

import { grpcConnection } from "./api"
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

import { StreamService } from "grpc/stream_pb_service";

export function connectToStream(authed: Authed, onMessage: (payload: StreamPayload) => void) {

    const streamConnectRequest = new StreamConnectReq()
    streamConnectRequest.setAuthed(authed)
    streamConnectRequest.setAction(StreamConnectReq.Action.REGISTER)

    grpc.invoke(StreamService.Connect, {
        request: streamConnectRequest,
        host: grpcConnection.url,
        onHeaders: (headers: Metadata) => {
            console.debug("queryBooks.onHeaders", headers);
        },

        onMessage: (payload: StreamPayload) => {
            console.debug("payload", payload);
						onMessage(payload)
        },

        onEnd: (code: Code, msg: string, trailers: Metadata) => {
            console.log("stream finished")
            console.log(code)
            console.log(msg)
        }
    })

}
