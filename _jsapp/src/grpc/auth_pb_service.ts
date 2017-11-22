// package: auth
// file: auth.proto

import * as auth_pb from "./auth_pb";
import * as github_com_gogo_protobuf_gogoproto_gogo_pb from "./github.com/gogo/protobuf/gogoproto/gogo_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
export class AuthService {
  static serviceName = "auth.AuthService";
}
export namespace AuthService {
  export class Auth {
    static readonly methodName = "Auth";
    static readonly service = AuthService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = google_protobuf_empty_pb.Empty;
    static readonly responseType = auth_pb.Authed;
  }
}
