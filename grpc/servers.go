package grpc

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"
	"github.com/ajainc/chain/grpc/server"

	"google.golang.org/grpc"
	"google.golang.org/grpc/health"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"
)

func registerServices(ctx context.Context, grpcServer *grpc.Server) error {

	gen.RegisterEntityServiceServer(grpcServer, *server.NewEntityServer(ctx))
	gen.RegisterRelationServiceServer(grpcServer, *server.NewRelationServer(ctx))
	healthpb.RegisterHealthServer(grpcServer, health.NewServer())

	return nil
}

func Setup(ctx context.Context, opts ...grpc.ServerOption) (*grpc.Server, error) {
	s := grpc.NewServer(opts...)
	err := registerServices(ctx, s)
	return s, err
}
