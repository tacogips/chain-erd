package server

import (
	"context"
	"io"

	"github.com/ajainc/chain/grpc/gen"
)

type EntityServer struct {
	AppCtx context.Context
}

// CreateNewEntity
func (server EntityServer) CreateNewEntity(stream gen.EntityService_CreateNewEntityServer) error {
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			break
		} else if err != nil {
			return err
		}

		// TODO tacogips make meaningful result
		result := &gen.EntityActivity{}

		stream.Send(result)
	}
	return nil
}

func NewEntityServer(ctx context.Context) *EntityServer {
	return &EntityServer{
		AppCtx: ctx,
	}
}
