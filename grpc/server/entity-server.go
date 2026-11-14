package server

import (
	"context"

	"github.com/tacogips/chain-erd/ctx/logger"
	"github.com/tacogips/chain-erd/event"
	"github.com/tacogips/chain-erd/grpc/gen"

	go16ctx "golang.org/x/net/context"
)

type EntityServer struct {
	appCtx            context.Context
	streamBroadcastCh chan *gen.StreamPayload
}

func (server *EntityServer) CreateEntity(_ go16ctx.Context, in *gen.Entity) (*gen.Activity, error) {

	logger.Debug(server.appCtx, "CreatEnity called")

	ev := event.NewCreateEntityEvent(in)
	activity, err := event.Exec(server.appCtx, ev, server.streamBroadcastCh)
	if err != nil {
		return nil, err
	}

	return activity.ToGRPCActivity(), nil
}

func (server *EntityServer) MoveEntity(ctx go16ctx.Context, in *gen.Move) (*gen.Activity, error) {

	logger.Debug(server.appCtx, "MoveEnity called")

	ev := event.NewMoveEntityEvent(in.ObjectID, *in.From, *in.To)

	activity, err := event.Exec(server.appCtx, ev, server.streamBroadcastCh)
	if err != nil {
		return nil, err
	}

	return activity.ToGRPCActivity(), nil
}

func (server *EntityServer) TransformEntity(ctx go16ctx.Context, transform *gen.Transform) (*gen.Activity, error) {

	logger.Debug(server.appCtx, "Tranform Entity called")

	ev := event.NewTransformEntityEvent(transform.ObjectID, *transform.From, *transform.To)

	activity, err := event.Exec(server.appCtx, ev, server.streamBroadcastCh)
	if err != nil {
		return nil, err
	}

	return activity.ToGRPCActivity(), nil
}

//NewEntityServer create entityServer
func NewEntityServer(ctx context.Context, streamBroadcastCh chan *gen.StreamPayload) *EntityServer {

	return &EntityServer{
		appCtx:            ctx,
		streamBroadcastCh: streamBroadcastCh,
	}
}
