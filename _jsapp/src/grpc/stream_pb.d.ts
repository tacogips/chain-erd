// package: stream
// file: stream.proto

import * as jspb from "google-protobuf";
import * as github_com_gogo_protobuf_gogoproto_gogo_pb from "./github.com/gogo/protobuf/gogoproto/gogo_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as erd_pb from "./erd_pb";

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

