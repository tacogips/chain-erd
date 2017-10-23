package gen

import (
	"context"

	"github.com/ajainc/chain/ctx/idgen"
)

func NewEntityObjectID(c context.Context) ObjectID {
	g := idgen.FromContext(c)
	return ObjectID{
		Type: "entity",
		Id:   g.Gen(),
	}
}

func NewColumnObjectID(c context.Context) ObjectID {
	g := idgen.FromContext(c)
	return ObjectID{
		Type: "column",
		Id:   g.Gen(),
	}
}

func NewCoordObjectID(c context.Context) ObjectID {
	g := idgen.FromContext(c)
	return ObjectID{
		Type: "coord",
		Id:   g.Gen(),
	}
}
