package server

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"
)

type EntityServer struct {
	Ctx context.Context
}

func (server EntityServer) CreateNewEntity(service gen.EntityService_CreateNewEntityServer) error {
	return nil
}

func NewEntityServer(ctx context.Context) *EntityServer {
	return &EntityServer{
		Ctx: ctx,
	}
}
