package event

import (
	"context"
	"fmt"

	"github.com/HouzuoGuo/tiedot/db"
	"github.com/tacogips/chain-erd/ctx/docdb"
	"github.com/tacogips/chain-erd/event/dao"
	"github.com/tacogips/chain-erd/grpc/gen"
	uuid "github.com/satori/go.uuid"
)

// CreateEntityEv stands for Creating New Entity at specified coordinates
func NewCreateEntityEvent(entity *gen.Entity) *CreateEntityEv {
	return &CreateEntityEv{
		eventID: uuid.NewV4().String(),
		Entity:  entity,
	}
}

type CreateEntityEv struct {
	eventID string
	Entity  *gen.Entity
}

func (ev *CreateEntityEv) EventID() string {
	return ev.eventID
}

func (ev *CreateEntityEv) Description() string {
	return fmt.Sprintf("Create Entity")
}

func (ev *CreateEntityEv) Exec(c context.Context) error {
	db := docdb.FromContext(c)

	ev.Entity.FillWithDefault()

	err := ev.Validate(db)
	if err != nil {
		return err
	}

	err = dao.InsertEntity(c, *ev.Entity)

	return err
}

func (ev *CreateEntityEv) Validate(db *db.DB) error {
	err := ev.Entity.Validate()
	if err != nil {
		return err
	}

	if docdb.ObjectIDExists(db, docdb.COLL_ENTITY, ev.Entity.ObjectID) {
		return fmt.Errorf("entity object <%s> already exists", ev.Entity.ObjectID)
	}
	return nil
}

func (ev *CreateEntityEv) ExecStreamPayloads(c context.Context) ([]*gen.StreamPayload, error) {
	_, entity, err := dao.GetEntityByObjectID(c, ev.Entity.ObjectID)
	if err != nil {
		return nil, err
	}

	return []*gen.StreamPayload{
		{
			Operation: gen.StreamPayload_NEW,
			Object: &gen.StreamPayload_Entity{
				&entity,
			},
		},
	}, nil
}

func (ev *CreateEntityEv) Undo(c context.Context) error {
	coll := docdb.COLL_ENTITY
	db := docdb.FromContext(c)

	id, _, err := docdb.GetByObjectID(db, coll, ev.Entity.ObjectID)
	if err != nil {
		return err
	}
	entities := db.Use(coll)
	return entities.Delete(id)
}

func (ev *CreateEntityEv) UndoStreamPayloads(c context.Context) ([]*gen.StreamPayload, error) {
	return []*gen.StreamPayload{
		{
			Operation: gen.StreamPayload_DELETE,
			Object: &gen.StreamPayload_Entity{
				ev.Entity,
			},
		},
	}, nil

}
