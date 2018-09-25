package grpc

import (
	"context"

	"github.com/tacogips/chain-erd/grpc/gen"
	"github.com/tacogips/chain-erd/grpc/server"

	"google.golang.org/grpc"
	"google.golang.org/grpc/health"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"
)

func registerServices(c context.Context, grpcServer *grpc.Server, streamBroadcastCh chan *gen.StreamPayload) error {

	authServer := server.NewAuthServer(c)
	gen.RegisterAuthServiceServer(grpcServer, authServer)

	entityServer := server.NewEntityServer(c, streamBroadcastCh)
	gen.RegisterEntityServiceServer(grpcServer, entityServer)

	relationServer := server.NewRelationServer(c, streamBroadcastCh)
	gen.RegisterRelationServiceServer(grpcServer, relationServer)

	streamServer := server.NewStreamServer(c, streamBroadcastCh)
	gen.RegisterStreamServiceServer(grpcServer, streamServer)

	// watch streamBroadcastCh
	go streamServer.WatchBroadcast()

	healthpb.RegisterHealthServer(grpcServer, health.NewServer())

	return nil
}

func Setup(c context.Context, streamBroadcastCh chan *gen.StreamPayload, opts ...grpc.ServerOption) (*grpc.Server, error) {
	s := grpc.NewServer(opts...)

	err := registerServices(c, s, streamBroadcastCh)

	return s, err
}
