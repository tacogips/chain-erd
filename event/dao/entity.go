package dao

import (
	"context"

	"github.com/ajainc/chain/ctx/docdb"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/fatih/structs"
	"github.com/mitchellh/mapstructure"
)

// InsertEntity
func InsertEntity(c context.Context, entity *gen.Entity) error {
	db := docdb.FromContext(c)

	var err error
	if err != nil {
		return err
	}

	entities := db.Use(docdb.COLL_ENTITY)
	_, err = entities.Insert(MarshalEntity(*entity))
	if err != nil {
		return err
	}

	return nil
}

// GetEntityByObjectID
func GetEntityByObjectID(c context.Context, objectID string) (*gen.Entity, error) {
	db := docdb.FromContext(c)

	_, result, err := docdb.GetByObjectID(db, docdb.COLL_ENTITY, objectID)
	if err != nil {
		return nil, err
	}
	var entity *gen.Entity

	err = UnmarshalEntity(result, entity)
	if err != nil {
		return nil, err
	}

	return entity, nil
}

func UnmarshalEntity(src map[string]interface{}, dst *gen.Entity) error {
	return mapstructure.Decode(src, dst)
}

func MarshalEntity(entity gen.Entity) map[string]interface{} {
	return structs.Map(entity)
}
