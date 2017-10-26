package graph

import (
	"errors"
	"fmt"

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

type errNotQuadValue struct {
	Val interface{}
}

func (e errNotQuadValue) Error() string {
	return fmt.Sprintf("not a quad.Value: %T", e.Val)
}

type ObjectID string

func (objectID ObjectID) ValidateObjectID() error {
	if len(objectID) > 2 {
		if objectID[0] != '<' || objectID[len(objectID)-1] != '>' {
			return fmt.Errorf("invalid object id: Not IRI style [%s]", "objectID")
		}
	}

	return nil
}

func (objectID ObjectID) String() string {
	return string(objectID)
}
