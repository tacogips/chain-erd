package server

import (
	"context"

	"github.com/ajainc/chain/ctx/logger"
	"github.com/ajainc/chain/grpc/gen"
	uuid "github.com/satori/go.uuid"

	go16ctx "golang.org/x/net/context"
)

type AuthServer struct {
	appCtx context.Context
}

func (server *AuthServer) Auth(_ go16ctx.Context, in *gen.AuthRequest) (*gen.Authed, error) {
	logger.Debug(server.appCtx, "Auth called")
	//TODO (taco) impl meaningful authentication logic
	authed := &gen.Authed{
		SessionID: uuid.NewV4().String(),
	}

	return authed, nil
}

//NewEntityServer create entityServer
func NewAuthServer(ctx context.Context) *AuthServer {
	return &AuthServer{
		appCtx: ctx,
	}
}
