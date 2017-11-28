/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var github_com_gogo_protobuf_gogoproto_gogo_pb = require('./github.com/gogo/protobuf/gogoproto/gogo_pb.js');
var google_protobuf_duration_pb = require('google-protobuf/google/protobuf/duration_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var erd_pb = require('./erd_pb.js');
var auth_pb = require('./auth_pb.js');
goog.exportSymbol('proto.stream.StreamConnectReq', null, global);
goog.exportSymbol('proto.stream.StreamConnectReq.Action', null, global);
goog.exportSymbol('proto.stream.StreamPayload', null, global);
goog.exportSymbol('proto.stream.StreamPayload.Operation', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.stream.StreamConnectReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.stream.StreamConnectReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.stream.StreamConnectReq.displayName = 'proto.stream.StreamConnectReq';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.stream.StreamConnectReq.prototype.toObject = function(opt_includeInstance) {
  return proto.stream.StreamConnectReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stream.StreamConnectReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stream.StreamConnectReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    authed: (f = msg.getAuthed()) && auth_pb.Authed.toObject(includeInstance, f),
    action: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.stream.StreamConnectReq}
 */
proto.stream.StreamConnectReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stream.StreamConnectReq;
  return proto.stream.StreamConnectReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stream.StreamConnectReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stream.StreamConnectReq}
 */
proto.stream.StreamConnectReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new auth_pb.Authed;
      reader.readMessage(value,auth_pb.Authed.deserializeBinaryFromReader);
      msg.setAuthed(value);
      break;
    case 2:
      var value = /** @type {!proto.stream.StreamConnectReq.Action} */ (reader.readEnum());
      msg.setAction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.stream.StreamConnectReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stream.StreamConnectReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stream.StreamConnectReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stream.StreamConnectReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAuthed();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      auth_pb.Authed.serializeBinaryToWriter
    );
  }
  f = message.getAction();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.stream.StreamConnectReq.Action = {
  REGISTER: 0,
  LOGOUT: 1
};

/**
 * optional auth.Authed authed = 1;
 * @return {?proto.auth.Authed}
 */
proto.stream.StreamConnectReq.prototype.getAuthed = function() {
  return /** @type{?proto.auth.Authed} */ (
    jspb.Message.getWrapperField(this, auth_pb.Authed, 1));
};


/** @param {?proto.auth.Authed|undefined} value */
proto.stream.StreamConnectReq.prototype.setAuthed = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.stream.StreamConnectReq.prototype.clearAuthed = function() {
  this.setAuthed(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.stream.StreamConnectReq.prototype.hasAuthed = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Action action = 2;
 * @return {!proto.stream.StreamConnectReq.Action}
 */
proto.stream.StreamConnectReq.prototype.getAction = function() {
  return /** @type {!proto.stream.StreamConnectReq.Action} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {!proto.stream.StreamConnectReq.Action} value */
proto.stream.StreamConnectReq.prototype.setAction = function(value) {
  jspb.Message.setProto3EnumField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.stream.StreamPayload = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.stream.StreamPayload.oneofGroups_);
};
goog.inherits(proto.stream.StreamPayload, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.stream.StreamPayload.displayName = 'proto.stream.StreamPayload';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.stream.StreamPayload.oneofGroups_ = [[2,3]];

/**
 * @enum {number}
 */
proto.stream.StreamPayload.ObjectCase = {
  OBJECT_NOT_SET: 0,
  ENTITY: 2,
  REL: 3
};

/**
 * @return {proto.stream.StreamPayload.ObjectCase}
 */
proto.stream.StreamPayload.prototype.getObjectCase = function() {
  return /** @type {proto.stream.StreamPayload.ObjectCase} */(jspb.Message.computeOneofCase(this, proto.stream.StreamPayload.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.stream.StreamPayload.prototype.toObject = function(opt_includeInstance) {
  return proto.stream.StreamPayload.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.stream.StreamPayload} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stream.StreamPayload.toObject = function(includeInstance, msg) {
  var f, obj = {
    operation: jspb.Message.getFieldWithDefault(msg, 1, 0),
    entity: (f = msg.getEntity()) && erd_pb.Entity.toObject(includeInstance, f),
    rel: (f = msg.getRel()) && erd_pb.Rel.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.stream.StreamPayload}
 */
proto.stream.StreamPayload.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.stream.StreamPayload;
  return proto.stream.StreamPayload.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.stream.StreamPayload} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.stream.StreamPayload}
 */
proto.stream.StreamPayload.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.stream.StreamPayload.Operation} */ (reader.readEnum());
      msg.setOperation(value);
      break;
    case 2:
      var value = new erd_pb.Entity;
      reader.readMessage(value,erd_pb.Entity.deserializeBinaryFromReader);
      msg.setEntity(value);
      break;
    case 3:
      var value = new erd_pb.Rel;
      reader.readMessage(value,erd_pb.Rel.deserializeBinaryFromReader);
      msg.setRel(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.stream.StreamPayload.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.stream.StreamPayload.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.stream.StreamPayload} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.stream.StreamPayload.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOperation();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getEntity();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      erd_pb.Entity.serializeBinaryToWriter
    );
  }
  f = message.getRel();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      erd_pb.Rel.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.stream.StreamPayload.Operation = {
  NEW: 0,
  MOD: 1,
  DELETE: 2
};

/**
 * optional Operation operation = 1;
 * @return {!proto.stream.StreamPayload.Operation}
 */
proto.stream.StreamPayload.prototype.getOperation = function() {
  return /** @type {!proto.stream.StreamPayload.Operation} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.stream.StreamPayload.Operation} value */
proto.stream.StreamPayload.prototype.setOperation = function(value) {
  jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional erd.Entity entity = 2;
 * @return {?proto.erd.Entity}
 */
proto.stream.StreamPayload.prototype.getEntity = function() {
  return /** @type{?proto.erd.Entity} */ (
    jspb.Message.getWrapperField(this, erd_pb.Entity, 2));
};


/** @param {?proto.erd.Entity|undefined} value */
proto.stream.StreamPayload.prototype.setEntity = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.stream.StreamPayload.oneofGroups_[0], value);
};


proto.stream.StreamPayload.prototype.clearEntity = function() {
  this.setEntity(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.stream.StreamPayload.prototype.hasEntity = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional erd.Rel rel = 3;
 * @return {?proto.erd.Rel}
 */
proto.stream.StreamPayload.prototype.getRel = function() {
  return /** @type{?proto.erd.Rel} */ (
    jspb.Message.getWrapperField(this, erd_pb.Rel, 3));
};


/** @param {?proto.erd.Rel|undefined} value */
proto.stream.StreamPayload.prototype.setRel = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.stream.StreamPayload.oneofGroups_[0], value);
};


proto.stream.StreamPayload.prototype.clearRel = function() {
  this.setRel(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.stream.StreamPayload.prototype.hasRel = function() {
  return jspb.Message.getField(this, 3) != null;
};


goog.object.extend(exports, proto.stream);
