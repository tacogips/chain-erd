package event

import (
	"context"
	"fmt"

	"github.com/HouzuoGuo/tiedot/db"
	"github.com/ajainc/chain/ctx/docdb"
	"github.com/ajainc/chain/event/dao"
	"github.com/ajainc/chain/grpc/gen"
	uuid "github.com/satori/go.uuid"
)

// NewMoveEntityEvent stands for Move Entity to specified coordinates
func NewMoveEntityEvent(entityObjectID string, from gen.Coord, to gen.Coord) *MoveEntityEv {
	return &MoveEntityEv{
		eventID:        uuid.NewV4().String(),
		entityObjectID: entityObjectID,
		from:           from,
		to:             to,
	}
}

type MoveEntityEv struct {
	eventID        string
	entityObjectID string
	from           gen.Coord
	to             gen.Coord
}

func (ev *MoveEntityEv) EventID() string {
	return ev.eventID
}

func (ev *MoveEntityEv) Description() string {
	return fmt.Sprintf("Move Entity")
}

func (ev *MoveEntityEv) Exec(c context.Context) error {
	db := docdb.FromContext(c)

	err := ev.Validate(db)
	if err != nil {
		return err
	}

	id, entity, err := dao.GetEntityByObjectID(c, ev.entityObjectID)
	if err != nil {
		return err
	}

	entity.Coord = &ev.to

	err = dao.UpdateEntity(c, id, entity)

	return err
}

func (ev *MoveEntityEv) Validate(db *db.DB) error {

	if !docdb.ObjectIDExists(db, docdb.COLL_ENTITY, ev.entityObjectID) {
		return fmt.Errorf("entity object <%s> not exists", ev.entityObjectID)
	}
	return nil
}

func (ev *MoveEntityEv) ExecStreamPayloads(c context.Context) ([]*gen.StreamPayload, error) {
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

func (ev *MoveEntityEv) Undo(c context.Context) error {
	id, entity, err := dao.GetEntityByObjectID(c, ev.entityObjectID)
	if err != nil {
		return err
	}

	entity.Coord = &ev.from

	err = dao.UpdateEntity(c, id, entity)
	return err
}

func (ev *MoveEntityEv) UndoStreamPayloads(c context.Context) ([]*gen.StreamPayload, error) {
	return ev.ExecStreamPayloads(c)
}
