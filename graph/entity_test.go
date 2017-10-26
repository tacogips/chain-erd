package graph

import (
	"testing"

	"github.com/ajainc/chain/grpc/gen"
)

// RegisterNewEntity register new entity
func TestCreateEntity(t *testing.T) {
	coord := &gen.ObjectCoordSize{
		ObjectId: string{},
		Coord:    &gen.Coordinate{},
		Size:     &gen.Size{},
	}
	CreateEntity(c, objCoordSize*gen.ObjectCoordSize)(*gen.Activity, error)
}
