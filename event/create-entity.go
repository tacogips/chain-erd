package event

import (
	"context"
	"fmt"

	"github.com/ajainc/chain/ctx/docdb"
	"github.com/ajainc/chain/ctx/docdb/dbutil"
	"github.com/ajainc/chain/grpc/gen"
)

// CeateEntityEv stands for Creating New Entity at specified coordinates
type CeateEntityEv struct {
	Entity gen.Entity
}

func (ev CeateEntityEv) Description() string {
	return "Create Entity"
}

func (ev CeateEntityEv) Do(c context.Context) error {

	db := docdb.FromContext(c)

	coll := docdb.COLL_ENTITY
	if dbutil.ObjectIDExists(db, coll, ev.Entity.ObjectID) {
		return fmt.Errorf("entity object <%s> already exists", ev.Entity.ObjectID)
	}

	entities := db.Use(coll)
	_, err := entities.Insert(dbutil.MarshalEntity(ev.Entity))

	return err
}

func (ev CeateEntityEv) Undo(c context.Context) error {
	coll := docdb.COLL_ENTITY

	db := docdb.FromContext(c)

	id, _, err := dbutil.GetByObjectID(db, coll, ev.Entity.ObjectID)
	if err != nil {
		return err
	}
	entities := db.Use(coll)
	return entities.Delete(id)

}
