package server

import (
	"context"

	"github.com/ajainc/chain/event"
	"github.com/ajainc/chain/grpc/gen"

	go16ctx "golang.org/x/net/context"
)

type EntityServer struct {
	appCtx            context.Context
	streamBroadcastCh chan *gen.StreamPayload
}

func (server *EntityServer) CreateEntity(_ go16ctx.Context, in *gen.Entity) (*gen.Activity, error) {
	ev := event.NewCeateEntityEvent(in)
	activity, err := event.Exec(server.appCtx, ev)
	if err != nil {
		return nil, err
	}
	return activity.ToGRPCActivity(), nil
}

func (server *EntityServer) MoveEntity(ctx go16ctx.Context, in *gen.Move) (*gen.Activity, error) {
	// TODO(tacogis): implement
	return nil, nil
}

//NewEntityServer create entityServer
func NewEntityServer(ctx context.Context, streamBroadcastCh chan *gen.StreamPayload) *EntityServer {

	return &EntityServer{
		appCtx:            ctx,
		streamBroadcastCh: streamBroadcastCh,
	}
}
