package event

import (
	"context"
	"fmt"

	"github.com/ajainc/chain/ctx/docdb"
	"github.com/ajainc/chain/ctx/docdb/dblogic"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/fatih/structs"
)

type CreateEntity struct {
	Entity gen.Entity
}

func (ev CreateEntity) Do(c context.Context) error {
	coll := docdb.COLL_ENTITY

	db := docdb.FromContext(c)

	if dblogic.ObjectIDExists(db, coll, ev.Entity.ObjectId) {
		return fmt.Errorf("entity  [%s] already exists", ev.Entity.ObjectId)
	}

	entities := db.Use(coll)
	entities.Insert(structs.Map(ev.Entity))

	return nil
}

func (ev CreateEntity) Undo(c context.Context) error {
	db := docdb.FromContext(c)

	return nil
}
