package store

import (
	"context"

	"github.com/ajainc/chain/ctx/graphdb"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
	"github.com/cayleygraph/cayley/quad"
)

// RegisterNewEntity register new entity
func RegisterNewEntity(c context.Context, coordAndSize gen.CoordinateAndSize) (gen.EntityActivity, error) {
	gdb := graphdb.FromContext(c)

	err := withTx(gdb, func(tx *graph.Transaction) error {
		setEntityCoord(c, gdb, tx, gen.NewEntityObjectID(c), *coordAndSize.Coordinate)
	})

	if err != nil {
		return gen.EntityActivity{}, err
	}

	return gen.EntityActivity{}, err
}

func GetEntity(objectID gen.ObjectID) (gen.Entity, error) {
	// TODO tacogips impl
	return gen.Entity{}, nil
}

func setEntityCoord(c context.Context, gdb *cayley.Handler, tx *graph.Transaction, entityID gen.ObjectID, coordinate gen.Coordinate) error {
	p := cayley.StartPath(gdb, entityID)

	p.Iterate(nil).EachValue(nil, func(v quad.Value) {
		gdb.RemoveQuad(v)
	})

	newCoord, err := makeNewCoord(c, tx, coord)
	if err != nil {
		return err
	}

	err := gdb.AddQuad(quad.Make(entityID, PredCoord, newCoord, ""))
	if err != nil {
		return err
	}
}

func makeNewCoord(c context.Context, tx *graph.Transaction, coord gen.Coordinate) (gen.ObjectID, error) {

	coordID := gen.NewCoordObjectID(c)
	tx.AddQuad(quad.Make(coordID, PredCoordX, coord.X))
	tx.AddQuad(quad.Make(coordID, PredCoordY, coord.Y))
	tx.AddQuad(quad.Make(entityID, PredCoord, coordID))
	return coordID, nil

}

func addColumnToEntity(gdb *graph.Transaction, entityID gen.ObjectID, columnID gen.ObjectID) error {
	return gdb.AddQuad(quad.Make(entityID, PredHasColumn, columnID, nil))
}
