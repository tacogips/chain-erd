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
func CreateEntity(c context.Context, objCoordSize *gen.ObjectCoordSize) (*gen.Activity, error) {
	gdb := graphdb.FromContext(c)

	err := withTx(gdb, func(tx *graph.Transaction) error {
		err := setObjectCoord(c, gdb, tx, objCoordSize.ObjectId, objCoordSize.Coord)
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

	//TODO(tacogips) fix naive implement
	removePredicateOfObject(gdb, tx, objectID, PredCoordX, "")
	removePredicateOfObject(gdb, tx, objectID, PredCoordY, "")

	tx.AddQuad(quad.Make(objectID, PredCoordX, coord.X, ""))
	tx.AddQuad(quad.Make(objectID, PredCoordY, coord.Y, ""))

	return nil
}

func removePredicateOfObject(gdb *cayley.Handle, tx *graph.Transaction, objectID string, predicate Predicate, label string) error {
	return cayley.StartPath(gdb, quad.StringToValue(objectID)).
		Out(predicate).
		Iterate(nil).
		Each(func(v graph.Value) {
			tx.RemoveQuad(quad.Make(objectID, predicate, v, label))
		})
}

func setSize(c context.Context, gdb *cayley.Handle, tx *graph.Transaction, objectID string, size *gen.Size) error {
	//TODO(tacogips) fix naive implement
	removePredicateOfObject(gdb, tx, objectID, PredSizeWidth, "")
	removePredicateOfObject(gdb, tx, objectID, PredSizeHeight, "")

	tx.AddQuad(quad.Make(objectID, PredSizeWidth, size.Width, ""))
	tx.AddQuad(quad.Make(objectID, PredSizeHeight, size.Height, ""))
	return nil

}
