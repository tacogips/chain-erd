package server

import (
	"context"

	"github.com/ajainc/chain/event"
	"github.com/ajainc/chain/grpc/gen"

	go16ctx "golang.org/x/net/context"
)

type EntityServer struct {
	AppCtx context.Context
}

// CreateEntity
//func (server EntityServer) CreateEntity(_ context.Context, position *gen.CoordWidthHeight) (*gen.Activity, error) {
//	store.CreateEntity(server.AppCtx, objPosition)
//}

func (server EntityServer) CreateEntity(_ go16ctx.Context, in *gen.Entity) (*gen.Activity, error) {
	ev := event.NewCeateEntityEvent(in)
	activity, err := event.Exec(server.AppCtx, ev)
	if err != nil {
		return nil, err
	}
	return activity.ToGRPCActivity(), nil
}

func (server EntityServer) MoveEntity(ctx go16ctx.Context, in *gen.Move) (*gen.Activity, error) {
	// TODO(tacogis): implement
	return nil, nil
}

//NewEntityServer create entityServer
func NewEntityServer(ctx context.Context) *EntityServer {
	return &EntityServer{
		AppCtx: ctx,
	}
}
