package graph

import (
	"context"

	"github.com/ajainc/chain/activity"
	"github.com/ajainc/chain/ctx/graphdb"
	"github.com/cayleygraph/cayley/graph"
)

func AccepctNewEntityEvent(c context.Context, ev gen.NewEntityEvent) error {
	gdb := graphdb.FromContext(c)

	err := withTx(gdb, func(tx *graph.Transaction) error {
		entity, err := RegisterNewEntity(c, ev.ObjectID, ev.CoordAndSize)
		return err
	})

	if err != nil {
		return err
	}

	activity.Store(c, ev, ev.ObjectID)

	return err
}

func AccepctNewEntityEvent(c context.Context, ev gen.NewEntityEvent) {
}
