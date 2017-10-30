package dbutil

import (
	"github.com/HouzuoGuo/tiedot/db"
	"github.com/ajainc/chain/ctx/docdb"
)

// FetchAllEntities returns all enitities  //TODO(tacogips)
func FetchAllEntities(d *db.DB) ([][]byte, error) {
	entities := d.Use(docdb.COLL_ENTITY)

	var result [][]byte

	entities.ForEachDoc(func(id int, doc []byte) bool {
		result = append(result, doc)
		return true
	})

	return result, nil
}
