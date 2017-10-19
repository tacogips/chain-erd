package grpc

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"
	"github.com/ajainc/chain/grpc/server"

	"google.golang.org/grpc"
	"google.golang.org/grpc/health"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"
)

func RegisterServers(ctx context.Context, grpcServer *grpc.Server) error {

	// entity server
	gen.RegisterEntityServiceServer(grpcServer, *server.NewEntityServer(ctx))
	gen.RegisterRelationServiceServer(grpcServer, *server.NewRelationServer(ctx))
	healthpb.RegisterHealthServer(grpcServer, health.NewServer())
	return nil
}
