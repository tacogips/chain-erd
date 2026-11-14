package dao

import (
	"context"

	"github.com/ajainc/chain/ctx/docdb"
	"github.com/ajainc/chain/ctx/logger"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/fatih/structs"
	"github.com/mitchellh/mapstructure"
)

// InsertEntity
func InsertEntity(c context.Context, entity gen.Entity) error {
	db := docdb.FromContext(c)

	var err error
	if err != nil {
		return err
	}

	entities := db.Use(docdb.COLL_ENTITY)
	_, err = entities.Insert(MarshalEntity(entity))
	if err != nil {
		return err
	}

	return nil
}

// UpdateEntity
func UpdateEntity(c context.Context, id int, entity gen.Entity) error {
	db := docdb.FromContext(c)

	var err error
	if err != nil {
		return err
	}

	entities := db.Use(docdb.COLL_ENTITY)
	err = entities.Update(id, MarshalEntity(entity))
	if err != nil {
		return err
	}

	return nil
}

// GetEntityByObjectID
func GetEntityByObjectID(c context.Context, objectID string) (int, gen.Entity, error) {
	db := docdb.FromContext(c)

	id, result, err := docdb.GetByObjectID(db, docdb.COLL_ENTITY, objectID)
	if err != nil {
		return 0, gen.Entity{}, err
	}

	entity := new(gen.Entity)
	err = UnmarshalEntity(result, entity)
	if err != nil {
		return 0, gen.Entity{}, err
	}

	return id, *entity, nil
}

//GetAllEntities
func GetAllEntities(c context.Context) ([]*gen.Entity, error) {
	db := docdb.FromContext(c)

	entities := db.Use(docdb.COLL_ENTITY)
	var result []*gen.Entity
	entities.ForEachDoc(func(id int, docContent []byte) bool {
		doc, err := entities.Read(id)
		if err != nil {
			logger.Error(c, err)
			return false
		}

		entity := new(gen.Entity)
		err = UnmarshalEntity(doc, entity)
		if err != nil {
			logger.Error(c, err)
			return false
		}
		result = append(result, entity)

		return true
	})

	return result, nil
}

func UnmarshalEntity(src map[string]interface{}, dst *gen.Entity) error {
	return mapstructure.Decode(src, dst)
}

func MarshalEntity(entity gen.Entity) map[string]interface{} {
	return structs.Map(entity)
}
