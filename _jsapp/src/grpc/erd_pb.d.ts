// package: erd
// file: erd.proto

import * as jspb from "google-protobuf";
import * as github_com_gogo_protobuf_gogoproto_gogo_pb from "./github.com/gogo/protobuf/gogoproto/gogo_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Coord extends jspb.Message {
  getX(): number;
  setX(value: number): void;

  getY(): number;
  setY(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Coord.AsObject;
  static toObject(includeInstance: boolean, msg: Coord): Coord.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Coord, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Coord;
  static deserializeBinaryFromReader(message: Coord, reader: jspb.BinaryReader): Coord;
}

export namespace Coord {
  export type AsObject = {
    x: number,
    y: number,
  }
}

export class WidthHeight extends jspb.Message {
  getW(): number;
  setW(value: number): void;

  getH(): number;
  setH(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WidthHeight.AsObject;
  static toObject(includeInstance: boolean, msg: WidthHeight): WidthHeight.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WidthHeight, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WidthHeight;
  static deserializeBinaryFromReader(message: WidthHeight, reader: jspb.BinaryReader): WidthHeight;
}

export namespace WidthHeight {
  export type AsObject = {
    w: number,
    h: number,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class Entity extends jspb.Message {
  getObjectId(): string;
  setObjectId(value: string): void;

  getName(): string;
  setName(value: string): void;

  hasCoord(): boolean;
  clearCoord(): void;
  getCoord(): Coord | undefined;
  setCoord(value?: Coord): void;

  hasWidthHeight(): boolean;
  clearWidthHeight(): void;
  getWidthHeight(): WidthHeight | undefined;
  setWidthHeight(value?: WidthHeight): void;

  getColor(): string;
  setColor(value: string): void;

  clearColumnsList(): void;
  getColumnsList(): Array<Column>;
  setColumnsList(value: Array<Column>): void;
  addColumns(value?: Column, index?: number): Column;

  getDepth(): number;
  setDepth(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Entity.AsObject;
  static toObject(includeInstance: boolean, msg: Entity): Entity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Entity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Entity;
  static deserializeBinaryFromReader(message: Entity, reader: jspb.BinaryReader): Entity;
}

export namespace Entity {
  export type AsObject = {
    objectId: string,
    name: string,
    coord?: Coord.AsObject,
    widthHeight?: WidthHeight.AsObject,
    color: string,
    columnsList: Array<Column.AsObject>,
    depth: number,
  }
}

export class Column extends jspb.Message {
  getObjectId(): string;
  setObjectId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getType(): ColumnType;
  setType(value: ColumnType): void;

  hasAttrs(): boolean;
  clearAttrs(): void;
  getAttrs(): EntityColumnAttributes | undefined;
  setAttrs(value?: EntityColumnAttributes): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Column.AsObject;
  static toObject(includeInstance: boolean, msg: Column): Column.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Column, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Column;
  static deserializeBinaryFromReader(message: Column, reader: jspb.BinaryReader): Column;
}

export namespace Column {
  export type AsObject = {
    objectId: string,
    name: string,
    type: ColumnType,
    attrs?: EntityColumnAttributes.AsObject,
  }
}

export class EntityColumnAttributes extends jspb.Message {
  hasAttrEnum(): boolean;
  clearAttrEnum(): void;
  getAttrEnum(): EnumColumnAttribute | undefined;
  setAttrEnum(value?: EnumColumnAttribute): void;

  hasAttrNumber(): boolean;
  clearAttrNumber(): void;
  getAttrNumber(): NumberColumnAttribute | undefined;
  setAttrNumber(value?: NumberColumnAttribute): void;

  hasAttrString(): boolean;
  clearAttrString(): void;
  getAttrString(): StringColumnAttribute | undefined;
  setAttrString(value?: StringColumnAttribute): void;

  getIsFk(): boolean;
  setIsFk(value: boolean): void;

  getIsPk(): boolean;
  setIsPk(value: boolean): void;

  getIsUnique(): boolean;
  setIsUnique(value: boolean): void;

  getIsNotNull(): boolean;
  setIsNotNull(value: boolean): void;

  getIsAutoIncrement(): boolean;
  setIsAutoIncrement(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntityColumnAttributes.AsObject;
  static toObject(includeInstance: boolean, msg: EntityColumnAttributes): EntityColumnAttributes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntityColumnAttributes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntityColumnAttributes;
  static deserializeBinaryFromReader(message: EntityColumnAttributes, reader: jspb.BinaryReader): EntityColumnAttributes;
}

export namespace EntityColumnAttributes {
  export type AsObject = {
    attrEnum?: EnumColumnAttribute.AsObject,
    attrNumber?: NumberColumnAttribute.AsObject,
    attrString?: StringColumnAttribute.AsObject,
    isFk: boolean,
    isPk: boolean,
    isUnique: boolean,
    isNotNull: boolean,
    isAutoIncrement: boolean,
  }
}

export class EnumColumnAttribute extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<string>;
  setValuesList(value: Array<string>): void;
  addValues(value: string, index?: number): string;

  getDefaultValue(): string;
  setDefaultValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EnumColumnAttribute.AsObject;
  static toObject(includeInstance: boolean, msg: EnumColumnAttribute): EnumColumnAttribute.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EnumColumnAttribute, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EnumColumnAttribute;
  static deserializeBinaryFromReader(message: EnumColumnAttribute, reader: jspb.BinaryReader): EnumColumnAttribute;
}

export namespace EnumColumnAttribute {
  export type AsObject = {
    valuesList: Array<string>,
    defaultValue: string,
  }
}

export class StringColumnAttribute extends jspb.Message {
  getLength(): number;
  setLength(value: number): void;

  getDefaultValue(): string;
  setDefaultValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StringColumnAttribute.AsObject;
  static toObject(includeInstance: boolean, msg: StringColumnAttribute): StringColumnAttribute.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StringColumnAttribute, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StringColumnAttribute;
  static deserializeBinaryFromReader(message: StringColumnAttribute, reader: jspb.BinaryReader): StringColumnAttribute;
}

export namespace StringColumnAttribute {
  export type AsObject = {
    length: number,
    defaultValue: string,
  }
}

export class NumberColumnAttribute extends jspb.Message {
  getLength(): number;
  setLength(value: number): void;

  getDecimal(): number;
  setDecimal(value: number): void;

  getIsUnsigned(): boolean;
  setIsUnsigned(value: boolean): void;

  getDefaultValue(): number;
  setDefaultValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NumberColumnAttribute.AsObject;
  static toObject(includeInstance: boolean, msg: NumberColumnAttribute): NumberColumnAttribute.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NumberColumnAttribute, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NumberColumnAttribute;
  static deserializeBinaryFromReader(message: NumberColumnAttribute, reader: jspb.BinaryReader): NumberColumnAttribute;
}

export namespace NumberColumnAttribute {
  export type AsObject = {
    length: number,
    decimal: number,
    isUnsigned: boolean,
    defaultValue: number,
  }
}

export class Rel extends jspb.Message {
  getObjectId(): string;
  setObjectId(value: string): void;

  hasPoint1(): boolean;
  clearPoint1(): void;
  getPoint1(): RelPoint | undefined;
  setPoint1(value?: RelPoint): void;

  hasPoint2(): boolean;
  clearPoint2(): void;
  getPoint2(): RelPoint | undefined;
  setPoint2(value?: RelPoint): void;

  hasAttribute(): boolean;
  clearAttribute(): void;
  getAttribute(): RelationAttribute | undefined;
  setAttribute(value?: RelationAttribute): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Rel.AsObject;
  static toObject(includeInstance: boolean, msg: Rel): Rel.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Rel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Rel;
  static deserializeBinaryFromReader(message: Rel, reader: jspb.BinaryReader): Rel;
}

export namespace Rel {
  export type AsObject = {
    objectId: string,
    point1?: RelPoint.AsObject,
    point2?: RelPoint.AsObject,
    attribute?: RelationAttribute.AsObject,
  }
}

export class RelPoint extends jspb.Message {
  getEntityObjectId(): number;
  setEntityObjectId(value: number): void;

  getColumnName(): string;
  setColumnName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelPoint.AsObject;
  static toObject(includeInstance: boolean, msg: RelPoint): RelPoint.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RelPoint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RelPoint;
  static deserializeBinaryFromReader(message: RelPoint, reader: jspb.BinaryReader): RelPoint;
}

export namespace RelPoint {
  export type AsObject = {
    entityObjectId: number,
    columnName: string,
  }

  export enum Assoc {
    One = 0,
    Many = 1,
  }
}

export class RelationAttribute extends jspb.Message {
  clearBentPointsList(): void;
  getBentPointsList(): Array<Coord>;
  setBentPointsList(value: Array<Coord>): void;
  addBentPoints(value?: Coord, index?: number): Coord;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelationAttribute.AsObject;
  static toObject(includeInstance: boolean, msg: RelationAttribute): RelationAttribute.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RelationAttribute, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RelationAttribute;
  static deserializeBinaryFromReader(message: RelationAttribute, reader: jspb.BinaryReader): RelationAttribute;
}

export namespace RelationAttribute {
  export type AsObject = {
    bentPointsList: Array<Coord.AsObject>,
  }
}

export class Move extends jspb.Message {
  getObjectId(): string;
  setObjectId(value: string): void;

  hasFrom(): boolean;
  clearFrom(): void;
  getFrom(): Coord | undefined;
  setFrom(value?: Coord): void;

  hasTo(): boolean;
  clearTo(): void;
  getTo(): Coord | undefined;
  setTo(value?: Coord): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Move.AsObject;
  static toObject(includeInstance: boolean, msg: Move): Move.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Move, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Move;
  static deserializeBinaryFromReader(message: Move, reader: jspb.BinaryReader): Move;
}

export namespace Move {
  export type AsObject = {
    objectId: string,
    from?: Coord.AsObject,
    to?: Coord.AsObject,
  }
}

export class CoordWH extends jspb.Message {
  hasCoord(): boolean;
  clearCoord(): void;
  getCoord(): Coord | undefined;
  setCoord(value?: Coord): void;

  hasWidthHeight(): boolean;
  clearWidthHeight(): void;
  getWidthHeight(): WidthHeight | undefined;
  setWidthHeight(value?: WidthHeight): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoordWH.AsObject;
  static toObject(includeInstance: boolean, msg: CoordWH): CoordWH.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CoordWH, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoordWH;
  static deserializeBinaryFromReader(message: CoordWH, reader: jspb.BinaryReader): CoordWH;
}

export namespace CoordWH {
  export type AsObject = {
    coord?: Coord.AsObject,
    widthHeight?: WidthHeight.AsObject,
  }
}

export class Transform extends jspb.Message {
  getObjectId(): string;
  setObjectId(value: string): void;

  hasFrom(): boolean;
  clearFrom(): void;
  getFrom(): CoordWH | undefined;
  setFrom(value?: CoordWH): void;

  hasTo(): boolean;
  clearTo(): void;
  getTo(): CoordWH | undefined;
  setTo(value?: CoordWH): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transform.AsObject;
  static toObject(includeInstance: boolean, msg: Transform): Transform.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Transform, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transform;
  static deserializeBinaryFromReader(message: Transform, reader: jspb.BinaryReader): Transform;
}

export namespace Transform {
  export type AsObject = {
    objectId: string,
    from?: CoordWH.AsObject,
    to?: CoordWH.AsObject,
  }
}

export class Activity extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Activity.AsObject;
  static toObject(includeInstance: boolean, msg: Activity): Activity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Activity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Activity;
  static deserializeBinaryFromReader(message: Activity, reader: jspb.BinaryReader): Activity;
}

export namespace Activity {
  export type AsObject = {
    id: string,
    description: string,
  }
}

export enum Order {
  ASC = 0,
  DESC = 1,
}

export enum ColumnType {
  BIT = 0,
  TINYINT = 1,
  BOOL = 2,
  SMALLINT = 3,
  MIDIUM = 4,
  INT = 5,
  INTEGER = 6,
  VARCHAR = 7,
  CHAR = 8,
  DATE = 9,
  DATETIME = 10,
  TIMESTAMP = 11,
}

