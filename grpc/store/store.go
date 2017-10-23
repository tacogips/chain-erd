package store

import (
	"context"
	"errors"

	"github.com/ajainc/chain/ctx/idgen"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
)

var NoObjecIDError = errors.New("No Object ID")

func newObjectID(ctx context.Context) gen.ObjectID {
	idg := idgen.FromContext(ctx)
	return gen.ObjectID{
		Val: idg.Gen(),
	}
}

func withTx(chdr *cayley.Handle, fn func(*graph.Transaction) error) error {
	tx := cayley.NewTransaction()
	err := fn(tx)
	if err != nil {
		return err
	}
	return chdr.ApplyTransaction(tx)
}
