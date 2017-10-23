package graph

import (
	"context"
	"fmt"

	"github.com/ajainc/chain/ctx/graphdb"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
	"github.com/cayleygraph/cayley/quad"
)

// RegisterNewEntity register new entity
func RegisterNewEntity(c context.Context, entityID gen.ObjectID, coordAndSize gen.CoordinateAndSize) (gen.EntityActivity, error) {
	gdb := graphdb.FromContext(c)

	err := withTx(gdb, func(tx *graph.Transaction) error {
		setEntityCoord(c, gdb, tx, ObjIDToStoreableID(entityID), *coordAndSize.Coordinate)
	})

	if err != nil {
		return gen.EntityActivity{}, err
	}

	gen.EntityActivity{}
	return gen.EntityActivity{}, err
}

func GetEntity(objectID gen.ObjectID) (gen.Entity, error) {
	// TODO tacogips impl
	return gen.Entity{}, nil
}

func setEntityCoord(c context.Context, gdb *cayley.Handle, tx *graph.Transaction, entityID StoreableID, coordinate gen.Coordinate) error {
	v, ok := quad.AsValue(entityID)
	if !ok {
		return fmt.Errorf("invalid  entity id %s ", entityID)
	}
	p := cayley.StartPath(gdb)

	p.Iterate(nil).EachValue(nil, func(v quad.Value) {
		//TODO tacogips
	})

	newCoordID, err := makeNewCoord(c, tx, coordinate)
	if err != nil {
		return err
	}

	err = gdb.AddQuad(quad.Make(entityID, PredCoord, ObjIDToStoreableID(newCoordID), ""))
	if err != nil {
		return err
	}

	//TODO tacogips delete replaced coordinate if coordinate was updated
	return nil
}

func makeNewCoord(c context.Context, tx *graph.Transaction, coord gen.Coordinate) (gen.ObjectID, error) {
	coordID := ObjIDToStoreableID(NewCoordObjectID(c))
	tx.AddQuad(quad.Make(coordID, PredCoordX, coord.X, ""))
	tx.AddQuad(quad.Make(coordID, PredCoordY, coord.Y, ""))

	return coordID, nil
}
