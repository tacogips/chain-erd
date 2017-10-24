package graph

import (
	"context"

	"github.com/ajainc/chain/ctx/graphdb"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
	"github.com/cayleygraph/cayley/graph/path"
	"github.com/cayleygraph/cayley/quad"
)

// RegisterNewEntity register new entity
func CreateEntity(c context.Context, objPosition *gen.ObjectPosition) (*gen.Activity, error) {
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
		return nil, err
	}

	return nil, err
}

func setObjectCoord(c context.Context, gdb *cayley.Handle, tx *graph.Transaction, objectID string, coordinate *gen.Coordinate) error {

	p := cayley.StartPath(gdb, quad.StringToValue(objectID))

	path.NewPath()

	//.Out(PredCoordX)

	it, _ := p.BuildIterator().Optimize()
	it, _ := store.OptimizeIterator(it)

	p.Iterate(nil).EachValue(nil, func(v quad.Value) {
		//TODO tacogips remove
	})

	err = tx.AddQuad(quad.Make(entityID, PredCoord, newCoordID, ""))
	if err != nil {
		return err
	}

	//TODO tacogips delete replaced coordinate if coordinate was updated
	return nil
}

func setCoord(c context.Context, tx *graph.Transaction, objectID string, coord *gen.Coordinate) error {
	tx.AddQuad(quad.Make(objectID, PredCoordX, coord.X, ""))
	tx.AddQuad(quad.Make(objectID, PredCoordY, coord.Y, ""))
	return nil
}

func setSize(c context.Context, tx *graph.Transaction, objectID string, coord *gen.Size) error {
	tx.AddQuad(quad.Make(objectID, PredSizeWidth, coord.X, ""))
	tx.AddQuad(quad.Make(objectID, PredSizeHeight, coord.Y, ""))
	return nil

}
