package server

import (
	"context"
	"errors"
	"fmt"

	"github.com/tacogips/chain-erd/grpc/gen"
)

type StreamListener struct {
	c          context.Context
	cancelFunc context.CancelFunc
	authed     gen.Authed
	mailBox    chan *gen.StreamPayload
	sink       gen.StreamService_ConnectServer
}

func newStreamListener(c context.Context, authed *gen.Authed, mailBoxSize int, sink gen.StreamService_ConnectServer) (*StreamListener, error) {
	if authed == nil {
		return nil, errors.New("no auth")
	}

	c, cancel := context.WithCancel(c)
	return &StreamListener{
		c:          c,
		cancelFunc: cancel,
		authed:     *authed,
		mailBox:    make(chan *gen.StreamPayload, mailBoxSize),
		sink:       sink,
	}, nil
}

func (rcvr *StreamListener) Listen() error {
	for {
		select {
		case message := <-rcvr.mailBox:
			err := rcvr.sink.Send(message)
			if err != nil {
				return fmt.Errorf("session <%s> has disconnected <%s>", rcvr.authed.SessionID, err.Error())
			}
		case <-rcvr.c.Done():
			return nil
		}
	}
}

func (rcvr *StreamListener) Send(payload *gen.StreamPayload) {
	rcvr.mailBox <- payload
}

func (rcvr *StreamListener) Close() {
	rcvr.cancelFunc()
}
