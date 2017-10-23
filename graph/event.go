package graph

import (
	"context"

	"github.com/ajainc/chain/ctx/graphdb"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley/graph"
)

type EventName string

//GraphDBEvent stand for a event affet to graphdb. all events  are enable to be serialized into json object, and stored a file.
type GraphDBEvent interface {
	EventName()
	Occur(context.Context) error
	Undo(context.Context) error
}

const (
	EvNewEntity  EventName = "NewEntity"
	EvMoveEntity           = "MoveEntity"
)

// RegisterNewEntityEvent is
type NewEntityEvent struct {
	ObjectID     gen.ObjectID          `json:"object_id"`
	CoordAndSize gen.CoordinateAndSize `json:"coordinate_and_size"`
}

func (ev NewEntityEvent) Occur(c context.Context) error {
	gdb := graphdb.FromContext(c)
	err := withTx(gdb, func(tx *graph.Transaction) error {
		entityID := NewEntityObjectID(c)
		RegisterNewEntity(c, ev.ObjectID, ev.CoordAndSize)
	})
	return err
}

func (ev NewEntityEvent) Undo(c context.Context) error {
	//TODO tacogips implment
	return nil
}

type MoveEntityEvent struct {
	ObjectID   gen.ObjectID
	StartPoint gen.Coordinate
	EndPoint   gen.Coordinate
}
