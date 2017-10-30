package docdb

import "github.com/HouzuoGuo/tiedot/db"

func initDB(db *db.DB) error {
	for _, collName := range allColls {
		if err := db.Create(collName); err != nil {
			return err
		}
	}

	// init entity coll
	{
		coll := db.Use(COLL_ENTITY)
		coll.Index([]string{OBJECT_ID})
	}

	// init entity coll
	{
		coll := db.Use(COLL_REL)
		coll.Index([]string{OBJECT_ID})
	}

	// init entity coll
	{
		coll := db.Use(COLL_ACTIVITY)
		coll.Index([]string{"id"})
	}
	return nil
}
