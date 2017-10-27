package dblogic

import (
	"errors"

	"github.com/HouzuoGuo/tiedot/db"
)

// GetByObjectID
var ErrNotFound = errors.New("not found")

// GetByObjectID returns object with tiedot internal id. return`ErrNotFound` if not found
func GetByObjectID(d *db.DB, collName string, objectID string) (int, interface{}, error) {
	coll := d.Use(collName)
	query := map[string]interface{}{
		"eq":    objectID,
		"in":    []interface{}{"object_id"},
		"limit": 1,
	}

	r := make(map[int]struct{})
	if err := db.EvalQuery(query, coll, &r); err != nil {
		return 0, nil, err
	}

	for id, obj := range r {
		return id, obj, nil

	}
	return 0, nil, ErrNotFound
}

// GetByObjectID returns true if object id exists in the collection
func ObjectIDExists(d *db.DB, collName string, objectID string) bool {
	_, _, err := GetByObjectID(d, collName, objectID)
	return err == ErrNotFound
}
