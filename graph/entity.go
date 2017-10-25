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
func CreateEntity(c context.Context, objPosition *gen.ObjectPosition) (*gen.Activity, error) {
	gdb := graphdb.FromContext(c)

	err := withTx(gdb, func(tx *graph.Transaction) error {
		err := setObjectCoord(c, gdb, tx, objPosition.ObjectId, objPosition.Coord)
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

func setObjectCoord(c context.Context, gdb *cayley.Handle, tx *graph.Transaction, objectID string, coord *gen.Coordinate) error {

	px := cayley.StartPath(gdb, quad.StringToValue(objectID)).Out(PredCoordX)
	py := cayley.StartPath(gdb, quad.StringToValue(objectID)).Out(PredCoordY)

	p := px.Or(py)

	it, _ := p.BuildIterator().Optimize()
	it, _ = gdb.OptimizeIterator(it)

	for it.Next() {
		token := it.Result()
		tx.RemoveQuad()
	}

	setCoord(c, tx, objectID, coord)
	return nil
}

func setCoord(c context.Context, tx *graph.Transaction, objectID string, coord *gen.Coordinate) error {
	tx.AddQuad(quad.Make(objectID, PredCoordX, coord.X, ""))
	tx.AddQuad(quad.Make(objectID, PredCoordY, coord.Y, ""))
	return nil
}

func setSize(c context.Context, tx *graph.Transaction, objectID string, size *gen.Size) error {
	tx.AddQuad(quad.Make(objectID, PredSizeWidth, size.Width, ""))
	tx.AddQuad(quad.Make(objectID, PredSizeHeight, size.Height, ""))
	return nil

}
