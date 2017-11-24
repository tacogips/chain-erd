package server

import (
	"context"
	"errors"
	"sync"

	"github.com/ajainc/chain/ctx/logger"
	"github.com/ajainc/chain/grpc/gen"
)

type StreamServer struct {
	appCtx               context.Context
	listenersLock        *sync.Mutex
	listenersBySessionID map[string]*StreamListener
	broadcastChannel     chan *gen.StreamPayload
}

func (svr *StreamServer) addListener(newListener *StreamListener) {
	svr.listenersLock.Lock()
	defer svr.listenersLock.Unlock()

	logger.Debugf(svr.appCtx, "new listener added to stream listners <%#v>", newListener)

	svr.listenersBySessionID[newListener.authed.SessionID] = newListener
}

func (svr *StreamServer) removeListener(sessionID string) {
	svr.listenersLock.Lock()
	defer svr.listenersLock.Unlock()

	logger.Debugf(svr.appCtx, "remove from stream listeners  <%#v>", sessionID)

	delete(svr.listenersBySessionID, sessionID)
}

func (svr *StreamServer) getListener(sessionID string) (*StreamListener, bool) {
	svr.listenersLock.Lock()
	defer svr.listenersLock.Unlock()
	listener, ok := svr.listenersBySessionID[sessionID]
	return listener, ok
}

func (svr *StreamServer) hasListener(sessionID string) bool {
	_, ok := svr.listenersBySessionID[sessionID]
	return ok
}

func (svr *StreamServer) BroadcastChannel() chan<- *gen.StreamPayload {
	return svr.broadcastChannel
}

func (svr *StreamServer) WatchBroadcast() {
	for {
		select {
		case payload := <-svr.broadcastChannel:
			for _, mailbox := range svr.listenersBySessionID {
				//TODO(taco) prevent send to listner who generate this payload
				mailbox.Send(payload)
			}

		case <-svr.appCtx.Done():
			return
		}
	}
}

func (server *StreamServer) Connect(req *gen.StreamConnectReq, stream gen.StreamService_ConnectServer) error {

	logger.Debugf(server.appCtx, "conneted to stream <%#v>", req)

	switch req.Action {

	case gen.StreamConnectReq_REGISTER:
		if server.hasListener(req.Authed.SessionID) {
			return errors.New("session already exists")
		}
		newListener, err := newStreamListener(server.appCtx, req.Authed, 100, stream)
		if err != nil {
			return err
		}
		server.addListener(newListener)
		err = newListener.Listen() // wait
		if err != nil {
			logger.Warnf(server.appCtx, err.Error())
		}
		newListener.Close()
		server.removeListener(req.Authed.SessionID)
		return err

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
func NewStreamServer(ctx context.Context, broadcastCh chan *gen.StreamPayload) *StreamServer {
	return &StreamServer{
		appCtx:               ctx,
		listenersLock:        &sync.Mutex{},
		listenersBySessionID: map[string]*StreamListener{},
		broadcastChannel:     broadcastCh,
	}
}
