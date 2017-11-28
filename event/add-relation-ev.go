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

// NewAddRelationEvent
func NewAddRelationEvent(rel *gen.Rel) *AddRelationEv {
	return &AddRelationEv{
		eventID: uuid.NewV4().String(),
		Rel:     rel,
	}
}

type AddRelationEv struct {
	eventID string
	Rel     *gen.Rel
}

func (ev *AddRelationEv) EventID() string {
	return ev.eventID
}

func (ev *AddRelationEv) Description() string {
	return fmt.Sprintf("Add Relation")
}

func (ev *AddRelationEv) Exec(c context.Context) error {
	db := docdb.FromContext(c)

	ev.Rel.FillWithDefault()
	err := ev.Validate(db)
	if err != nil {
		return err
	}

	err = dao.InsertRelation(c, *ev.Rel)

	return err
}

func (ev *AddRelationEv) Validate(db *db.DB) error {
	err := ev.Rel.Validate()
	if err != nil {
		return err
	}

	if docdb.ObjectIDExists(db, docdb.COLL_REL, ev.Rel.ObjectID) {
		return fmt.Errorf("relation object <%s> already exists", ev.Rel.ObjectID)
	}
	return nil
}

func (ev *AddRelationEv) ExecStreamPayloads(c context.Context) ([]*gen.StreamPayload, error) {
	_, rel, err := dao.GetRelationByObjectID(c, ev.Rel.ObjectID)
	if err != nil {
		return nil, err
	}

	//TODO(taco) use helper
	return []*gen.StreamPayload{
		{
			Operation: gen.StreamPayload_NEW,
			Object: &gen.StreamPayload_Rel{
				&rel,
			},
		},
	}, nil
}

func (ev *AddRelationEv) Undo(c context.Context) error {
	coll := docdb.COLL_ENTITY
	db := docdb.FromContext(c)

	id, _, err := docdb.GetByObjectID(db, coll, ev.Rel.ObjectID)
	if err != nil {
		return err
	}
	rels := db.Use(coll)
	return rels.Delete(id)
}

func (ev *AddRelationEv) UndoStreamPayloads(c context.Context) ([]*gen.StreamPayload, error) {
	//TODO(taco) use helper
	return []*gen.StreamPayload{
		{
			Operation: gen.StreamPayload_DELETE,
			Object: &gen.StreamPayload_Rel{
				ev.Rel,
			},
		},
	}, nil

}
