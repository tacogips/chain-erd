package docdb

import (
	"errors"

	"github.com/HouzuoGuo/tiedot/db"
)

// GetByObjectID
var ErrNotFound = errors.New("not found")

// GetByObjectID returns object with tiedot internal id. return`ErrNotFound` if not found
func GetByObjectID(d *db.DB, collName string, objectID string) (int, map[string]interface{}, error) {
	coll := d.Use(collName)
	query := map[string]interface{}{
		"eq":    objectID,
		"in":    []interface{}{OBJECT_ID},
		"limit": 1,
	}

	r := make(map[int]struct{})
	if err := db.EvalQuery(query, coll, &r); err != nil {
		return 0, nil, err
	}

	for id := range r {
		result, err := coll.Read(id)
		if err != nil {
			return 0, nil, err
		}
		return id, result, nil
	}

	return 0, nil, ErrNotFound
}

// GetByObjectID returns true if object id exists in the collection
func ObjectIDExists(d *db.DB, collName string, objectID string) bool {
	_, _, err := GetByObjectID(d, collName, objectID)
	return !IsNotFound(err)
}

// IsNotFound
func IsNotFound(err error) bool {
	return err == ErrNotFound
}
