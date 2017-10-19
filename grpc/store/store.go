package store

import (
	"context"
	"errors"

	"github.com/ajainc/chain/ctx/idgen"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
	"github.com/cayleygraph/cayley/quad"
)

var NoObjecIDError = errors.New("No Object ID")

func newObjectID(ctx context.Context) gen.ObjectID {
	idg := idgen.FromContext(ctx)
	return gen.ObjectID{
		Val: idg.Gen(),
	}
}

func addColumnToEntity(gdb *graph.Transaction, entityID gen.ObjectID, columnID gen.ObjectID) error {
	return gdb.AddQuad(quad.Make(entityID, PredHasColumn, columnID))
}

func setEntityPosition(gdb *graph.Transaction, entityID gen.ObjectID, coordinate gen.Coordinate) error {

	//PredHasWidth = "HasWidth"
	//PredHasHeight = "HasHeight"

	p := cayley.StartPath(gdb, entityID).Out(PredHasWidth).Each()
	p.Iterate(nil).EachValue()
	RemoveQuad(quad.Quad)

	return gdb.AddQuad(quad.Make(entityID, PredHasColumn, columnID))
}

func setEntityVersion(gdb *graph.Transaction, entityID gen.ObjectID, coordinate gen.Coordinate) error {

	p := cayley.StartPath(gdb, entityID).Out(PredVersion)

	err := p.Iterate(nil).EachValue()

	gdb.RemoveQuad
	RemoveQuad(quad.Quad)

	return gdb.AddQuad(quad.Make(entityID, PredHasColumn, columnID))
}

func withTx(chdr *cayley.Handle, fn func(*graph.Transaction) error) error {
	tx := cayley.NewTransaction()
	err := fn(tx)
	if err != nil {
		return err
	}
	return chdr.ApplyTransaction(tx)
}
