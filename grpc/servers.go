package grpc

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"
	"github.com/ajainc/chain/grpc/server"
	"github.com/improbable-eng/grpc-web/go/grpcweb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/health"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"
)

func registerServices(c context.Context, grpcServer *grpc.Server, streamBroadcastCh chan *gen.StreamPayload) error {
	gen.RegisterEntityServiceServer(grpcServer, *server.NewEntityServer(c))
	gen.RegisterStreamServiceServer(grpcServer, server.NewStreamServer(c, streamBroadcastCh))

	healthpb.RegisterHealthServer(grpcServer, health.NewServer())

	return nil
}

func Setup(c context.Context, streamBroadcastCh chan *gen.StreamPayload, opts ...grpc.ServerOption) (*grpcweb.WrappedGrpcServer, error) {
	s := grpc.NewServer(opts...)

	err := registerServices(c, s, streamBroadcastCh)

	wrappedGrpc := grpcweb.WrapServer(s)

	return wrappedGrpc, err
}
