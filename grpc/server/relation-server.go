package server

import (
	"context"

	"github.com/ajainc/chain/ctx/logger"
	"github.com/ajainc/chain/event"
	"github.com/ajainc/chain/grpc/gen"

	go16ctx "golang.org/x/net/context"
)

type RelationServer struct {
	appCtx            context.Context
	streamBroadcastCh chan *gen.StreamPayload
}

func (server *RelationServer) AddRelation(_ go16ctx.Context, in *gen.Rel) (*gen.Activity, error) {

	logger.Debug(server.appCtx, "AddRelation called")

	ev := event.NewAddRelationEvent(in)
	activity, err := event.Exec(server.appCtx, ev, server.streamBroadcastCh)
	if err != nil {
		return nil, err
	}

	return activity.ToGRPCActivity(), nil
}

//NewRelationServer create relation server
func NewRelationServer(ctx context.Context, streamBroadcastCh chan *gen.StreamPayload) *RelationServer {

	return &RelationServer{
		appCtx:            ctx,
		streamBroadcastCh: streamBroadcastCh,
	}
}
