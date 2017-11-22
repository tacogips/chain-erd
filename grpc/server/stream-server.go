package server

import (
	"context"
	"errors"
	"sync"

	"github.com/ajainc/chain/grpc/gen"
)

type StreamServer struct {
	AppCtx               context.Context
	listenerLock         *sync.Mutex
	listenersBySessionID map[string]*StreamListener
}

func (svr *StreamServer) addListener(newListener *StreamListener) {
	svr.listenerLock.Lock()
	defer svr.listenerLock.Unlock()

	svr.listenersBySessionID[newListener.authed.SessionID] = newListener
}

func (svr *StreamServer) removeListener(sessionID string) {
	svr.listenerLock.Lock()
	defer svr.listenerLock.Unlock()

	delete(svr.listenersBySessionID, sessionID)
}

func (svr *StreamServer) getListener(sessionID string) (*StreamListener, bool) {
	svr.listenerLock.Lock()
	defer svr.listenerLock.Unlock()
	listener, ok := svr.listenersBySessionID[sessionID]
	return listener, ok
}

func (svr *StreamServer) hasListener(sessionID string) bool {
	_, ok := svr.listenersBySessionID[sessionID]
	return ok
}

func (server *StreamServer) Connect(req *gen.StreamConnectReq, stream gen.StreamService_ConnectServer) error {
	switch req.Action {

	case gen.StreamConnectReq_REGISTER:
		if server.hasListener(req.Authed.SessionID) {
			return errors.New("session already exists")
		}
		newListener, err := newStreamListener(server.AppCtx, req.Authed, 100, stream)
		if err != nil {
			return err
		}
		server.addListener(newListener)
		newListener.Listen()

	case gen.StreamConnectReq_LOGOUT:
		listener, ok := server.getListener(req.Authed.SessionID)
		if !ok {
			return errors.New("no session")
		}
		listener.Close()
		server.removeListener(req.Authed.SessionID)
	}

	return nil
}

// NewStreamServer
func NewStreamServer(ctx context.Context) *StreamServer {
	return &StreamServer{
		AppCtx:               ctx,
		listenerLock:         &sync.Mutex{},
		listenersBySessionID: map[string]*StreamListener{},
	}
}
