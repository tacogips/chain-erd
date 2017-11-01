package docdb

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"

	tdb "github.com/HouzuoGuo/tiedot/db"
	"github.com/ajainc/chain/ctx/logger"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/mattn/go-sqlite3"
)

type diedotKey int

var key diedotKey = 1

// FromContext
func FromContext(c context.Context) *tdb.DB {
	store, ok := c.Value(key).(*tdb.DB)
	if !ok {
		panic(fmt.Errorf("no db in the app context"))
	}
	return store
}

var DefaultConfig = Config{}

type Config struct {
	DBDirPath string `yaml:db_path:`
	PersistDB bool   `yaml:persist_database:` // if true, database dir madeby tiedot will not be removed when shutdown.
}

func WithContext(c context.Context, conf Config) (context.Context, error) {
	return WithContextWithName(c, conf, "", "chaindb", true)
}

// WithContext setup tiedot database adn add it into context. DB waits <-context.Context.Done() to close database so the context cancelation function should be called on caller's responsibility
func WithContextWithName(c context.Context, conf Config, tempDirPrefix string, dbName string, doInit bool) (context.Context, error) {
	dbDirPath := conf.DBDirPath

	if len(dbDirPath) == 0 {
		var err error
		dbDirPath, err = ioutil.TempDir("", tempDirPrefix)
		if err != nil {
			return c, err
		}
	}

	if fi, err := os.Stat(dbDirPath); os.IsNotExist(err) {
		err := os.MkdirAll(dbDirPath, os.ModeDir)
		if err != nil {
			return c, err
		}
	} else if err != nil {
		return c, err
	} else if !fi.IsDir() {
		return c, fmt.Errorf("%s is not directory", dbDirPath)
	}

	db, err := tdb.OpenDB(dbDirPath)
	if err != nil {
		return c, err
	}

	if doInit {
		err := initDB(db)
		if err != nil {
			return c, err
		}
	}

	c = context.WithValue(c, key, db)

	closeFunc := func() error {
		db.Close()
		os.RemoveAll(dbDirPath)
		logger.Debug(c, "tiedot closed")
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
