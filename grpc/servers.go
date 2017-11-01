package grpc

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"
	"github.com/ajainc/chain/grpc/server"

	"google.golang.org/grpc"
	"google.golang.org/grpc/health"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"
)

func registerServices(c context.Context, grpcServer *grpc.Server) error {
	gen.RegisterEntityServiceServer(grpcServer, *server.NewEntityServer(c))
	healthpb.RegisterHealthServer(grpcServer, health.NewServer())

	return nil
}

func Setup(c context.Context, opts ...grpc.ServerOption) (*grpc.Server, error) {
	s := grpc.NewServer(opts...)
	err := registerServices(c, s)
	return s, err
}
