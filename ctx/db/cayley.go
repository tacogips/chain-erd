package db

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/mattn/go-sqlite3"
)

type cayleyKey int

var key cayleyKey = 1

// FromContext
func FromContext(ctx context.Context) *cayley.Handle {
	store, ok := ctx.Value(key).(*cayley.Handle)
	if !ok {
		panic(fmt.Errorf("no db store in the context "))
	}
	return store
}

// WithContext
func WithContext(ctx context.Context, dbFileName string, opts graph.Options) (context.Context, CloseFunc, error) {
	boltdbFile, err := ioutil.TempFile("", dbFileName)
	if err != nil {
		return ctx, nil, err
	}

	store, err := cayley.NewGraph("chain_graph", boltdbFile.Name(), opts)
	if err != nil {
		return ctx, nil, err
	}

	ctx = context.WithValue(ctx, key, store)

	closeFunc := func() error {
		err := os.Remove(boltdbFile.Name()) // clean up
		return err
	}

	return ctx, closeFunc, nil
}
