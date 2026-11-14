package grpc

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"
	"github.com/ajainc/chain/grpc/server"

	"google.golang.org/grpc"
)

func registerServices(ctx context.Context, grpcServer *grpc.Server) error {

	// entity server
	gen.RegisterEntityServiceServer(grpcServer, *server.NewEntityServer(ctx))
	return nil
}

func Serve() {
	//TODO tacogips add handlers
	//TODO what WAF used

}
