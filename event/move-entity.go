package event

import (
	"context"

	"github.com/ajainc/chain/ctx/docdb"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/fatih/structs"
)

type MoveEvent struct {
	Entity gen.Entity
}

func (ev MoveEvent) Do(c context.Context) error {
	db := docdb.FromContext(c)

	entities := db.Use(docdb.COLL_ENTITY)
	_, err := entities.Insert(structs.Map(ev.Entity))
	if err != nil {
		return err
	}

	return nil
}

func (ev MoveEvent) Undo(c context.Context) error {
	db := docdb.FromContext(c)

	_, err := entities.(structs.Map(ev.Entity))
	if err != nil {
		return err
	}

	return nil
}
