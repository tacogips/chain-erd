package event

import (
	"context"
	"testing"

	"github.com/ajainc/chain/ctx/docdb/testutil"
)

func TestCreateEntity(t *testing.T) {
	c := context.Background()
	c, closeDB, err := testutil.WithTestDBContext(c)
	if err != nil {
		panic(err)
	}
	defer closeDB()

}

//type CreateEntity struct {
//	Entity gen.Entity
//}
//
//func (ev CreateEntity) Description() string {
//	return "Create Entity"
//}
//
//func (ev CreateEntity) Do(c context.Context) error {
//	coll := docdb.COLL_ENTITY
//
//	db := docdb.FromContext(c)
//
//	if dblogic.ObjectIDExists(db, coll, ev.Entity.ObjectID) {
//		return fmt.Errorf("entity  [%s] already exists", ev.Entity.ObjectID)
//	}
//
//	entities := db.Use(coll)
//	_, err := entities.Insert(structs.Map(ev.Entity))
//
//	return err
//}
//
//func (ev CreateEntity) Undo(c context.Context) error {
//	coll := docdb.COLL_ENTITY
//
//	db := docdb.FromContext(c)
//
//	id, _, err := dblogic.GetByObjectID(db, coll, ev.Entity.ObjectID)
//	if err != nil {
//		return err
//	}
//	entities := db.Use(coll)
//	return entities.Delete(id)
//
//}
