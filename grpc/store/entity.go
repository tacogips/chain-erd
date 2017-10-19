package store

import (
	"context"

	"github.com/ajainc/chain/ctx/graphdb"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley/graph"
)

// RegisterNewEntity register new entity
func RegisterNewEntity(ctx context.Context, position gen.CoordinateAndSize) (gen.EntityActivity, error) {
	gdb := graphdb.FromContext(ctx)

	err := withTx(gdb, func(tx *graph.Transaction) error {
		//newEntityID := genid.FromContext(gen)
		//setEntityPosition(gdb, entityID, coordinate)
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
