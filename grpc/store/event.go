package store

import (
	"context"

	"github.com/ajainc/chain/ctx/graphdb"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley/graph"
)

type EventName string

//GraphDBEvent stand for graphdb edit event. all events  are enable to be serialized into json object, and stored a file.
type GraphDBEvent interface {
	Occur(context.Context) error
	Undo(context.Context) error
}

const (
	EvNewEntity  EventName = "NewEntity"
	EvMoveEntity           = "MoveEntity"
)

// RegisterNewEntityEvent is
type NewEntityEvent struct {
	ObjectID   gen.ObjectID   `json:"objectId"`
	Coordinate gen.Coordinate `json:"coordinate"`
	Size       gen.Size       `json:"size"`
}

func (ev NewEntityEvent) Occur(ctx context.Context) error {
	gdb := graphdb.FromContext(ctx)

	err := withTx(gdb, func(tx *graph.Transaction) error {
		setEntityPosition(tx, ev.ObjectID, ev.Coordinate)

	})
	return err
}

func (ev NewEntityEvent) Undo(ctx context.Context) error {
	//TODO tacogips
	return nil
}

type MoveEntityEvent struct {
	ObjectID   gen.ObjectID
	StartPoint gen.Coordinate
	EndPoint   gen.Coordinate
}
