package dao

import (
	"context"

	"github.com/tacogips/chain-erd/ctx/docdb"
	"github.com/tacogips/chain-erd/ctx/logger"
	"github.com/tacogips/chain-erd/grpc/gen"
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

//GetAllRelations
func GetAllRelations(c context.Context) ([]*gen.Rel, error) {
	db := docdb.FromContext(c)

	rels := db.Use(docdb.COLL_REL)
	var result []*gen.Rel
	rels.ForEachDoc(func(id int, docContent []byte) bool {
		doc, err := rels.Read(id)
		if err != nil {
			logger.Error(c, err)
			return false
		}

		entity := new(gen.Rel)
		err = UnmarshalRelation(doc, entity)
		if err != nil {
			logger.Error(c, err)
			return false
		}
		result = append(result, entity)

		return true
	})

	return result, nil
}

func UnmarshalRelation(src map[string]interface{}, dst *gen.Rel) error {
	return mapstructure.Decode(src, dst)
}

func MarshalRelation(rel gen.Rel) map[string]interface{} {
	return structs.Map(rel)
}
