package store

import (
	"context"

	"github.com/ajainc/chain/ctx/db"
	"github.com/ajainc/chain/grpc/gen"
)

// RegisterEntity register new entity
func CreateEntity(c context.Context, cwh *gen.CoordWidthHeight) (*gen.Activity, error) {
	tdb := db.FromContext(c)
	entities := tdb.Use(db.COLL_ENTITY)

	//TODO tacogips also set size

	return nil, err
}
