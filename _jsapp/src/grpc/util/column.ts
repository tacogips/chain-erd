
import { Column, ColumnType, EntityColumnAttributes, EnumColumnAttribute, NumberColumnAttribute, StringColumnAttribute } from 'grpc/erd_pb'
  import { EnumValues } from 'enum-values';


interface CommonColumnAttr {
    pk: boolean,
    fk: boolean
    unique: boolean
    notNull: boolean
    autoIncrement?: boolean
}

export function newColumn(
    objectId: string,
    name: string,
    columnType: ColumnType,
    attr: EntityColumnAttributes): Column {

    const column = new Column()
    column.setObjectId(name)
    column.setName(name)
    column.setType(columnType)
    column.setAttrs(attr)

    return column
}

export function isNumberCol(col: Column): boolean {
    return col.getAttrs().hasAttrNumber()
}

export function isStringCol(col: Column): boolean {
    return col.getAttrs().hasAttrString()
}

export function isEnumCol(col: Column): boolean {
    return col.getAttrs().hasAttrEnum()
}


function newCommonColumnAttr(common: CommonColumnAttr): EntityColumnAttributes {

    const attr = new EntityColumnAttributes()

    attr.setIsFk(common.pk)
    attr.setIsPk(common.fk)
    attr.setIsNotNull(common.notNull)
    attr.setIsUnique(common.unique)
    if (common.autoIncrement) {
        attr.setIsAutoIncrement(common.autoIncrement)
    } else {
        attr.setIsAutoIncrement(false)
    }

    return attr
}

export function newEnumColumnAttr(common: CommonColumnAttr, vals: Array<string>, defaultValue?: string): EntityColumnAttributes {
    const attr = new EntityColumnAttributes()

    attr.setIsFk(common.pk)
    attr.setIsPk(common.fk)
    attr.setIsNotNull(common.notNull)
    attr.setIsUnique(common.unique)

    const eattr = new EnumColumnAttribute()
    eattr.setValuesList(vals)

    if (defaultValue) {
        eattr.setDefaultValue(defaultValue)
    }
    attr.setAttrEnum(eattr)

    return attr
}

export function newStringColumnAttr(
    common: CommonColumnAttr,
    length: number,
    defaultValue?: string
): EntityColumnAttributes {

    const attr = new EntityColumnAttributes()

    attr.setIsFk(common.pk)
    attr.setIsPk(common.fk)
    attr.setIsNotNull(common.notNull)
    attr.setIsUnique(common.unique)

    const sattr = new StringColumnAttribute()

    sattr.setLength(length)

    if (defaultValue) {
        sattr.setDefaultValue(defaultValue)
    }
    attr.setAttrString(sattr)
    return attr
}

export function newNumberColumnAttr(
    common: CommonColumnAttr,
    length: number,
    decimal: number,
    unsigned: boolean,
    defaultValue?: number): EntityColumnAttributes {

    const attr = new EntityColumnAttributes()

    attr.setIsFk(common.pk)
    attr.setIsPk(common.fk)
    attr.setIsNotNull(common.notNull)
    attr.setIsUnique(common.unique)

    const nattr = new NumberColumnAttribute()

    nattr.setLength(length)
    nattr.setDecimal(decimal)
    nattr.setIsUnsigned(unsigned)

    if (defaultValue) {
        nattr.setDefaultValue(defaultValue)
    }
    attr.setAttrNumber(nattr)
    return attr

}

const columntypeNames =EnumValues.getNames(ColumnType)

export function columnTypeName(ct:ColumnType):string{
	return columntypeNames[ct]
}
