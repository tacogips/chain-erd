package dbtestutil

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"os"

	"github.com/tacogips/chain-erd/ctx/docdb"
)

// WithTestDBContext create empty database ad random temp dir path.
// Return context Datbase within with CloserFunc that wipe the temp dir out.
func WithTestDBContext(c context.Context) (context.Context, func() error, error) {

	dbDir := ""

	randomBytes := make([]byte, 16)
	rand.Read(randomBytes)
	nonceDirPrefix := hex.EncodeToString(randomBytes)

	var err error
	c, err = docdb.WithContextWithName(c, docdb.Config{}, nonceDirPrefix, "test_chaindb", true)
	if err != nil {
		return c, nil, err
	}

	closeFunc := func() error {
		return os.RemoveAll(dbDir)
	}

	return c, closeFunc, nil
}
