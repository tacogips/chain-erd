package server

import (
	"context"

	"github.com/ajainc/chain/graph"
	"github.com/ajainc/chain/grpc/gen"
)

type EntityServer struct {
	AppCtx context.Context
}

//	for {
//		position, err := stream.Recv()
//		if err == io.EOF {
//			break
//		} else if err != nil {
//			return err
//		}
//
//		// TODO tacogips make meaningful result
//		result := &gen.EntityActivity{}
//		entityActivity, err := graph.RegisterNewEntity(server.AppCtx, position)
//
//		stream.Send(&entityActivity)
//	}
//
//	return nil

// CreateNewEntity
func (server EntityServer) CreateEntity(c context.Context, position *gen.ObjectPosition) (*gen.Activity, error) {

	context.WithValue()
	graph.CreateNewEntity()
	return nil, nil

}

func NewEntityServer(ctx context.Context) *EntityServer {
	return &EntityServer{
		AppCtx: ctx,
	}
}
