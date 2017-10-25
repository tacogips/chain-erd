package graph

import (
	"errors"

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
