// package: stream
// file: stream.proto

import * as stream_pb from "./stream_pb";
import * as github_com_gogo_protobuf_gogoproto_gogo_pb from "./github.com/gogo/protobuf/gogoproto/gogo_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as erd_pb from "./erd_pb";
import * as auth_pb from "./auth_pb";
export class StreamService {
  static serviceName = "stream.StreamService";
}
export namespace StreamService {
  export class Connect {
    static readonly methodName = "Connect";
    static readonly service = StreamService;
    static readonly requestStream = false;
    static readonly responseStream = true;
    static readonly requestType = stream_pb.StreamConnectReq;
    static readonly responseType = stream_pb.StreamPayload;
  }
}
