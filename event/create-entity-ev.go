package event

import (
	"context"
	"fmt"

	"github.com/HouzuoGuo/tiedot/db"
	"github.com/ajainc/chain/ctx/docdb"
	"github.com/ajainc/chain/event/dao"
	"github.com/ajainc/chain/grpc/gen"
)

// CeateEntityEv stands for Creating New Entity at specified coordinates
func NewCeateEntityEvent(entity *gen.Entity) *CeateEntityEv {
	return &CeateEntityEv{
		Entity: entity,
	}
}

type CeateEntityEv struct {
	Entity *gen.Entity
}

func (ev *CeateEntityEv) Description() string {
	return fmt.Sprintf("Create Entity")
}

func (ev *CeateEntityEv) Exec(c context.Context) error {
	db := docdb.FromContext(c)

	ev.Entity.FillWithDefault()

	err := ev.Validate(db)
	if err != nil {
		return err
	}

	err = dao.InsertEntity(c, ev.Entity)

	return err
}

func (ev *CeateEntityEv) Validate(db *db.DB) error {
	err := ev.Entity.Validate()
	if err != nil {
		return err
	}

	if docdb.ObjectIDExists(db, docdb.COLL_ENTITY, ev.Entity.ObjectID) {
		return fmt.Errorf("entity object <%s> already exists", ev.Entity.ObjectID)
	}
	return nil
}

func (ev *CeateEntityEv) ExecStreamPayloads(c context.Context) ([]*gen.StreamPayload, error) {
	entity, err := dao.GetEntityByObjectID(c, ev.Entity.ObjectID)
	if err != nil {
		return nil, err
	}

	return []*gen.StreamPayload{
		{
			Operation: gen.StreamPayload_NEW,
			Object: &gen.StreamPayload_Entity{
				entity,
			},
		},
	}, nil
}

func (ev *CeateEntityEv) Undo(c context.Context) error {
	coll := docdb.COLL_ENTITY
	db := docdb.FromContext(c)

	id, _, err := docdb.GetByObjectID(db, coll, ev.Entity.ObjectID)
	if err != nil {
		return err
	}
	entities := db.Use(coll)
	return entities.Delete(id)
}

func (ev *CeateEntityEv) UndoStreamPayloads(c context.Context) ([]*gen.StreamPayload, error) {
	return []*gen.StreamPayload{
		{
			Operation: gen.StreamPayload_DELETE,
			Object: &gen.StreamPayload_Entity{
				ev.Entity,
			},
		},
	}, nil

}
