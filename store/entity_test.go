package store

import (
	"context"
	"testing"

	"github.com/ajainc/chain/ctx/graphdb"
	"github.com/ajainc/chain/grpc/gen"
)

// RegisterNewEntity register new entity
func TestCreateEntity(t *testing.T) {
	c, _ := graphdb.WithContext(context.Background())

	type testData struct {
		c       context.Context
		setupDB func(context.Context)
		inputs  []gen.ObjectCoordWH
	}

	//resetTestData := func(t *testData) {
	//	t.c = context.Background()
	//	t.setupDB(t.c)
	//}

	input := &gen.ObjectCoordWH{
		ObjectId: "<obj1>",
		Coord: &gen.Coord{
			X: 123.5,
			Y: 678.9,
		},
		Wh: &gen.WH{
			Width:  10.4,
			Height: 22.5,
		},
	}

	//TODO(tacogipd) activity test
	CreateEntity(c, input)

}
