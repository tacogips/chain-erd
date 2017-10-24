package graph

import (
	"context"
	"errors"

	"github.com/ajainc/chain/ctx/idgen"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
)

var NoObjecIDError = errors.New("No Object ID")

func withTx(chdr *cayley.Handle, fn func(*graph.Transaction) error) error {
	tx := cayley.NewTransaction()
	err := fn(tx)
	if err != nil {
		return err
	}
	return chdr.ApplyTransaction(tx)
}

func NewEntityObjectID(c context.Context) gen.ObjectID {
	return newObjectID(c, "entity")
}

func NewColumnObjectID(c context.Context) gen.ObjectID {
	return newObjectID(c, "column")
}

func NewCoordObjectID(c context.Context) gen.ObjectID {
	return newObjectID(c, "coord")
}

func newObjectID(c context.Context, objType string) gen.ObjectID {
	g := idgen.FromContext(c)
	return gen.ObjectID{
		Type: objType,
		Val:  g.Gen(),
	}
}
