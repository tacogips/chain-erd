package grpc

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"

	"google.golang.org/grpc"
)

type factorServer struct {
	Ctx context.Context
}

func (server factorServer) PrimeFactors(gen.Factors_PrimeFactorsServer) error {
	return nil
}

func newFactorServer(ctx context.Context) *factorServer {
	return &factorServer{
		Ctx: ctx,
	}
}

func registerServices(ctx context.Context, grpcServer *grpc.Server) error {
	// register server
	gen.RegisterFactorsServer(grpcServer, *newFactorServer(ctx))
	return nil
}

func Serve() {
	//TODO tacogips add handlers
	//TODO what WAF used

}
