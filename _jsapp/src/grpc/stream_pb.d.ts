// package: stream
// file: stream.proto

import * as jspb from "google-protobuf";
import * as github_com_gogo_protobuf_gogoproto_gogo_pb from "./github.com/gogo/protobuf/gogoproto/gogo_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as erd_pb from "./erd_pb";
import * as auth_pb from "./auth_pb";

export class StreamConnectReq extends jspb.Message {
  hasAuthed(): boolean;
  clearAuthed(): void;
  getAuthed(): auth_pb.Authed | undefined;
  setAuthed(value?: auth_pb.Authed): void;

  getAction(): StreamConnectReq.Action;
  setAction(value: StreamConnectReq.Action): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamConnectReq.AsObject;
  static toObject(includeInstance: boolean, msg: StreamConnectReq): StreamConnectReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamConnectReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamConnectReq;
  static deserializeBinaryFromReader(message: StreamConnectReq, reader: jspb.BinaryReader): StreamConnectReq;
}

export namespace StreamConnectReq {
  export type AsObject = {
    authed?: auth_pb.Authed.AsObject,
    action: StreamConnectReq.Action,
  }

  export enum Action {
    REGISTER = 0,
    LOGOUT = 1,
  }
}

export class StreamPayload extends jspb.Message {
  getEvent(): StreamPayload.Event;
  setEvent(value: StreamPayload.Event): void;

  hasEntity(): boolean;
  clearEntity(): void;
  getEntity(): erd_pb.Entity | undefined;
  setEntity(value?: erd_pb.Entity): void;

  hasRel(): boolean;
  clearRel(): void;
  getRel(): erd_pb.Rel | undefined;
  setRel(value?: erd_pb.Rel): void;

  getObjectCase(): StreamPayload.ObjectCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamPayload.AsObject;
  static toObject(includeInstance: boolean, msg: StreamPayload): StreamPayload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamPayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamPayload;
  static deserializeBinaryFromReader(message: StreamPayload, reader: jspb.BinaryReader): StreamPayload;
}

export namespace StreamPayload {
  export type AsObject = {
    event: StreamPayload.Event,
    entity?: erd_pb.Entity.AsObject,
    rel?: erd_pb.Rel.AsObject,
  }

  export enum Event {
    NEW = 0,
    MOD = 1,
    DELETE = 2,
  }

  export enum ObjectCase {
    OBJECT_NOT_SET = 0,
    ENTITY = 2,
    REL = 3,
  }
}

