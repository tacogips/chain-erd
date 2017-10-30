package server

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"
	"github.com/ajainc/chain/store"
)

type EntityServer struct {
	AppCtx context.Context
}

// CreateEntity
func (server EntityServer) CreateEntity(_ context.Context, position *gen.CoordWidthHeight) (*gen.Activity, error) {
	store.CreateEntity(server.AppCtx, objPosition)
}

func NewEntityServer(ctx context.Context) *EntityServer {
	return &EntityServer{
		AppCtx: ctx,
	}
}
