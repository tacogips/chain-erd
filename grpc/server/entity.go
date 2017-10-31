package server

import (
	"context"

	"github.com/ajainc/chain/event"
	"github.com/ajainc/chain/grpc/gen"
	"github.com/ajainc/chain/store"
)

type EntityServer struct {
	AppCtx context.Context
}

// CreateEntity
//func (server EntityServer) CreateEntity(_ context.Context, position *gen.CoordWidthHeight) (*gen.Activity, error) {
//	store.CreateEntity(server.AppCtx, objPosition)
//}

func (server EntityServer) CreateEntity(_ context.Context, in *gen.Entity) (*gen.Activity, error) {

	ev := event.NewCeateEntityEvent(entity * gen.Entity)

	store.CreateEntity(server.AppCtx, in)
}

func (server EntityServer) MoveEntity(ctx context.Context, in *gen.Move) (*gen.Activity, error) {
	// TODO(tacogis): implement
	return nil, nil
}

func NewEntityServer(ctx context.Context) *EntityServer {
	return &EntityServer{
		AppCtx: ctx,
	}
}
