package dao

import (
	"context"

	"github.com/ajainc/chain/ctx/docdb"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/fatih/structs"
	"github.com/mitchellh/mapstructure"
)

func InsertRelation(c context.Context, rel gen.Rel) error {
	db := docdb.FromContext(c)

	var err error
	if err != nil {
		return err
	}

	entities := db.Use(docdb.COLL_REL)
	_, err = entities.Insert(MarshalRelation(rel))
	if err != nil {
		return err
	}

	return nil
}

// GetRelationByObjectID
func GetRelationByObjectID(c context.Context, objectID string) (int, gen.Rel, error) {
	db := docdb.FromContext(c)

	id, result, err := docdb.GetByObjectID(db, docdb.COLL_REL, objectID)
	if err != nil {
		return 0, gen.Rel{}, err
	}

	rel := new(gen.Rel)
	err = UnmarshalRelation(result, rel)
	if err != nil {
		return 0, gen.Rel{}, err
	}

	return id, *rel, nil
}

func UnmarshalRelation(src map[string]interface{}, dst *gen.Rel) error {
	return mapstructure.Decode(src, dst)
}

func MarshalRelation(rel gen.Rel) map[string]interface{} {
	return structs.Map(rel)
}
