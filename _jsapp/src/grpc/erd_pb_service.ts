// package: erd
// file: erd.proto

import * as erd_pb from "./erd_pb";
import * as github_com_gogo_protobuf_gogoproto_gogo_pb from "./github.com/gogo/protobuf/gogoproto/gogo_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
export class EntityService {
  static serviceName = "erd.EntityService";
}
export namespace EntityService {
  export class CreateEntity {
    static readonly methodName = "CreateEntity";
    static readonly service = EntityService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = erd_pb.Entity;
    static readonly responseType = erd_pb.Activity;
  }
  export class MoveEntity {
    static readonly methodName = "MoveEntity";
    static readonly service = EntityService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = erd_pb.Move;
    static readonly responseType = erd_pb.Activity;
  }
  export class TransformEntity {
    static readonly methodName = "TransformEntity";
    static readonly service = EntityService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = erd_pb.Transform;
    static readonly responseType = erd_pb.Activity;
  }
}
export class RelationService {
  static serviceName = "erd.RelationService";
}
export namespace RelationService {
  export class AddRelation {
    static readonly methodName = "AddRelation";
    static readonly service = RelationService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = erd_pb.Rel;
    static readonly responseType = erd_pb.Activity;
  }
}
export class ActivityService {
  static serviceName = "erd.ActivityService";
}
export namespace ActivityService {
  export class Redo {
    static readonly methodName = "Redo";
    static readonly service = ActivityService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = erd_pb.Activity;
    static readonly responseType = erd_pb.Activity;
  }
  export class Undo {
    static readonly methodName = "Undo";
    static readonly service = ActivityService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = erd_pb.Activity;
    static readonly responseType = erd_pb.Activity;
  }
}
