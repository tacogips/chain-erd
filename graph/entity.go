package graph

import (
	"context"

	"github.com/ajainc/chain/ctx/graphdb"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
	"github.com/cayleygraph/cayley/quad"
)

// RegisterNewEntity register new entity
func CreateNewEntity(c context.Context, objPosition gen.ObjectPosition) (gen.Activity, error) {
	gdb := graphdb.FromContext(c)

	err := withTx(gdb, func(tx *graph.Transaction) error {
		err := setEntityCoord(c, gdb, tx, objPosition.ObjectId, objPosition.Coord)
		if err != nil {
			return err
		}

		//TODO tacogips also set size

		return nil
	})

	if err != nil {
		return gen.EntityActivity{}, err
	}

	return gen.EntityActivity{}, err
}

func setEntityCoord(c context.Context, gdb *cayley.Handle, tx *graph.Transaction, entityID string, coordinate gen.Coordinate) error {
	p := cayley.StartPath(gdb, entityID).Out(PredCoord)

	p.Iterate(nil).EachValue(nil, func(v quad.Value) {
		//TODO tacogips remove
	})

	newCoordID, err := makeNewCoord(c, tx, coordinate)
	if err != nil {
		return err
	}

	err = tx.AddQuad(quad.Make(entityID, PredCoord, newCoordID, ""))
	if err != nil {
		return err
	}

	//TODO tacogips delete replaced coordinate if coordinate was updated
	return nil
}

func setEntitySize(c context.Context, gdb *cayley.Handle, tx *graph.Transaction, entityID gen.ObjectID, size gen.Size) error {
	p := cayley.StartPath(gdb)

	p.Iterate(nil).EachValue(nil, func(v quad.Value) {
		//TODO tacogips
		tx.RemoveQuad()
	})

	err = gdb.AddQuad(quad.Make(entityID, PredCoord, newCoordID, ""))
	if err != nil {
		return err
	}

	//TODO tacogips delete replaced coordinate if coordinate was updated
	return nil
}

func makeNewCoord(c context.Context, tx *graph.Transaction, coord gen.Coordinate) (gen.ObjectID, error) {
	coordID := NewCoordObjectID(c)
	tx.AddQuad(quad.Make(coordID, PredCoordX, coord.X, ""))
	tx.AddQuad(quad.Make(coordID, PredCoordY, coord.Y, ""))

	return coordID, nil
}
