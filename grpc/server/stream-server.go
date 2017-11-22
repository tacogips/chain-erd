package server

import (
	"context"
	"sync"

	"github.com/ajainc/chain/grpc/gen"
)

type StreamServer struct {
	AppCtx               context.Context
	listenerLock         *sync.Mutex
	listenersBySessionID map[string]StreamListener
}

func (svr *StreamServer) addListener(newListener StreamListener) {
	svr.listenerLock.Lock()
	defer svr.listenerLock.Unlock()

	svr.listenersBySessionID[newListener.authed.SessionID] = newListener
}

func (svr *StreamServer) removeListener(sessionID string) {
	svr.listenerLock.Lock()
	defer svr.listenerLock.Unlock()

	delete(svr.listenersBySessionID, sessionID)
}

func (server *StreamServer) Connect(req *gen.StreamConnectReq, stream gen.StreamService_ConnectServer) error {
	switch req.Action {

	case gen.StreamConnectReq_REGISTER:

	case gen.StreamConnectReq_LOGOUT:

	}

	return nil
}

// NewStreamServer
func NewStreamServer(ctx context.Context) *StreamServer {
	return &StreamServer{
		AppCtx:               ctx,
		listenerLock:         &sync.Mutex{},
		listenersBySessionID: map[string]StreamListener{},
	}
}
