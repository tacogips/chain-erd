package graphdb

import (
	"context"
	"fmt"
	"net/http"

	"github.com/cayleygraph/cayley"
	cserver "github.com/cayleygraph/cayley/server/http"
	cserver "github.com/cayleygraph/cayley/server/http/"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/mattn/go-sqlite3"
)

type cayleyKey int

var key cayleyKey = 1

// FromContext
func FromContext(c context.Context) *cayley.Handle {
	store, ok := c.Value(key).(*cayley.Handle)
	if !ok {
		panic(fmt.Errorf("no db store in the context "))
	}
	return store
}

// WithContext
func WithContext(c context.Context) (context.Context, error) {
	// TODO tacogips
	store, err := cayley.NewMemoryGraph()
	if err != nil {
		return c, err
	}

	c = context.WithValue(c, key, store)

	closeFunc := func() error {
		err := store.Close()
		return err
	}

	go func() {
		select {
		case <-c.Done():
			closeFunc()
		}
	}()

	return c, nil
}

//Serve serve cayley browser
func Serve(c context.Context) error {
	gdb := FromContext(c)

	api := cserver.NewAPIv2(gdb)
	cayleyServer := &http.Server{
		Addr:    fmt.Sprintf(":%d", 10111),
		Handler: api,
	}

	go func() {
		cayleyServer.ListenAndServe()
	}()

	for {
		select {
		case cs <- c.Done():
			cayleyServer.Shutdown(context.Background())
		}
	}

}
