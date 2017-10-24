package server

import (
	"context"
	"io"

	"github.com/ajainc/chain/graph"
	"github.com/ajainc/chain/grpc/gen"
)

type EntityServer struct {
	AppCtx context.Context
}

// CreateNewEntity
func (server EntityServer) CreateNewEntity(stream gen.EntityService_CreateNewEntityServer) error {
	for {
		position, err := stream.Recv()
		if err == io.EOF {
			break
		} else if err != nil {
			return err
		}

		// TODO tacogips make meaningful result
		result := &gen.EntityActivity{}
		entityActivity, err := graph.RegisterNewEntity(server.AppCtx, position)

		stream.Send(&entityActivity)
	}

	return nil
}

func NewEntityServer(ctx context.Context) *EntityServer {
	return &EntityServer{
		AppCtx: ctx,
	}
}
