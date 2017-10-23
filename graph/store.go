package graph

import (
	"context"
	"errors"
	"fmt"

	"github.com/ajainc/chain/ctx/idgen"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
)

var NoObjecIDError = errors.New("No Object ID")

type StoreableID string

// ObjToStoreableObject
func ObjIDToStoreableID(gen.ObjectID) StoreableObject {
	return fmt.Sprintf("%s:%s", o.Type, o.ID)
}

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

func NewEntityObjectID(c context.Context) ObjectID {
	g := idgen.FromContext(c)
	return ObjectID{
		Type: "entity",
		Id:   g.Gen(),
	}
}

func NewColumnObjectID(c context.Context) ObjectID {
	g := idgen.FromContext(c)
	return ObjectID{
		Type: "column",
		Id:   g.Gen(),
	}
}

func NewCoordObjectID(c context.Context) ObjectID {
	g := idgen.FromContext(c)
	return ObjectID{
		Type: "coord",
		Id:   g.Gen(),
	}
}
