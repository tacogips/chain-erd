package server

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"
)

type RelationServer struct {
	Ctx context.Context
}

func (server RelationServer) ConnectRelation(service gen.RelationService_ConnectRelationServer) error {
	return nil
}

func (server RelationServer) DeleteRelation(service gen.RelationService_DeleteRelationServer) error {
	return nil
}

func NewRelationServer(ctx context.Context) *RelationServer {
	return &RelationServer{
		Ctx: ctx,
	}
}
