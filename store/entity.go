package store

import (
	"context"

	"github.com/ajainc/chain/ctx/db"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
	"github.com/cayleygraph/cayley/quad"
)

// RegisterNewEntity register new entity
func CreateEntity(c context.Context, objCoordWH *gen.ObjectCoordWH) (*gen.Activity, error) {
	gdb := db.FromContext(c)

	err := setObjectCoord(c, gdb, tx, objCoordWH.ObjectId, objCoordWH.Coord)
	if err != nil {
		return err
	}

	err = setObjectWidthHeight(c, gdb, tx, objCoordWH.ObjectId, objCoordWH.Wh)
	if err != nil {
		return err
	}

	//TODO tacogips also set size

	return nil, err
}

func setObjectCoord(c context.Context, gdb *cayley.Handle, objectID string, coord *gen.Coord) error {

	//TODO(tacogips) fix naive implement
	removePredicateOfObject(gdb, tx, objectID, PredCoordX, "")
	removePredicateOfObject(gdb, tx, objectID, PredCoordY, "")

	tx.AddQuad(quad.Make(objectID, PredCoordX, coord.X, ""))
	tx.AddQuad(quad.Make(objectID, PredCoordY, coord.Y, ""))

	return nil
}

func removePredicateOfObject(gdb *cayley.Handle, tx *graph.Transaction, objectID string, predicate string, label string) error {
	return cayley.StartPath(gdb, quad.StringToValue(objectID)).
		Out(predicate).
		Iterate(nil).
		Each(func(v graph.Value) {
			tx.RemoveQuad(quad.Make(objectID, predicate, v, label))
		})
}

func setObjectWidthHeight(c context.Context, gdb *cayley.Handle, tx *graph.Transaction, objectID string, wh *gen.WH) error {
	//TODO(tacogips) fix naive implement
	removePredicateOfObject(gdb, tx, objectID, PredSizeWidth, "")
	removePredicateOfObject(gdb, tx, objectID, PredSizeHeight, "")

	tx.AddQuad(quad.Make(objectID, PredSizeWidth, wh.Width, ""))
	tx.AddQuad(quad.Make(objectID, PredSizeHeight, wh.Height, ""))

	return nil
}

//func GetAllEntities() []gen.Entity {
//
//}

//func GetEntity(objectID string) gen.Entity {
//
//	gen.Entity
//
//}
