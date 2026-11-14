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

// NewTransformEntityEvent stands for Creating New Entity at specified coordinates
func NewTransformEntityEvent(entityObjectID string, from gen.CoordWH, to gen.CoordWH) *TransformEntityEv {
	return &TransformEntityEv{
		eventID:        uuid.NewV4().String(),
		entityObjectID: entityObjectID,
		from:           from,
		to:             to,
	}
}

type TransformEntityEv struct {
	eventID        string
	entityObjectID string
	from           gen.CoordWH
	to             gen.CoordWH
}

func (ev *TransformEntityEv) EventID() string {
	return ev.eventID
}

func (ev *TransformEntityEv) Description() string {
	return fmt.Sprintf("Transform Entity")
}

func (ev *TransformEntityEv) Exec(c context.Context) error {
	db := docdb.FromContext(c)

	err := ev.Validate(db)
	if err != nil {
		return err
	}

	id, entity, err := dao.GetEntityByObjectID(c, ev.entityObjectID)
	if err != nil {
		return err
	}

	entity.Coord = ev.to.Coord
	entity.WidthHeight = ev.to.WidthHeight

	err = dao.UpdateEntity(c, id, entity)

	return err
}

func (ev *TransformEntityEv) Validate(db *db.DB) error {

	if !docdb.ObjectIDExists(db, docdb.COLL_ENTITY, ev.entityObjectID) {
		return fmt.Errorf("entity object <%s> not exists", ev.entityObjectID)
	}
	return nil
}

func (ev *TransformEntityEv) ExecStreamPayloads(c context.Context) ([]*gen.StreamPayload, error) {
	_, entity, err := dao.GetEntityByObjectID(c, ev.entityObjectID)
	if err != nil {
		return nil, err
	}

	return []*gen.StreamPayload{
		{
			Operation: gen.StreamPayload_MOD,
			Object: &gen.StreamPayload_Entity{
				&entity,
			},
		},
	}, nil
}

func (ev *TransformEntityEv) Undo(c context.Context) error {
	id, entity, err := dao.GetEntityByObjectID(c, ev.entityObjectID)
	if err != nil {
		return err
	}

	entity.Coord = ev.from.Coord
	entity.WidthHeight = ev.from.WidthHeight

	err = dao.UpdateEntity(c, id, entity)
	return err
}

func (ev *TransformEntityEv) UndoStreamPayloads(c context.Context) ([]*gen.StreamPayload, error) {
	return ev.ExecStreamPayloads(c)
}
