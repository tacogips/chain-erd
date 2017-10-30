package docdb

import (
	"github.com/HouzuoGuo/tiedot/db"
)

// FetchAllEntities returns all enitities  //TODO(tacogips)
func FetchAllEntities(d *db.DB) ([][]byte, error) {
	entities := d.Use(COLL_ENTITY)

	var result [][]byte

	entities.ForEachDoc(func(id int, doc []byte) bool {
		result = append(result, doc)
		return true
	})

	return result, nil
}
