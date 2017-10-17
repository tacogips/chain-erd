package serve

import (
	"context"
	"net/http"

	"github.com/tacogips/chain/grpc/gen"

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
	pb.RegisterFactorsServer(grpcServer, *newIssueCuepointServer(ctx))
	return nil
}

func Serve() http.Handler {
	NewHttpHandler
	//TODO tacogips add handlers
	//TODO what WAF used

}
