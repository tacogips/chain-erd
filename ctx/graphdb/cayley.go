package graphdb

import (
	"context"
	"fmt"

	"github.com/cayleygraph/cayley"
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
func WithContext(ctx context.Context) (context.Context, CloseFunc, error) {
	// TODO tacogips
	store, err := cayley.NewMemoryGraph()
	if err != nil {
		return ctx, nil, err
	}

	ctx = context.WithValue(ctx, key, store)
	closeFunc := func() error {
		err := store.Close()
		return err
	}

	return ctx, closeFunc, nil
}
