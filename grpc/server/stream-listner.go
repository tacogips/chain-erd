package server

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"
)

type StreamListener struct {
	c          context.Context
	cancelFunc context.CancelFunc
	sessionID  string
	mailBox    chan []byte
}

func newStreamListener(c context.Context, sessionID string, mailBoxSize int, sink gen.StreamService_ConnectServer) *StreamListener {
	c, cancel := context.WithCancel(c)
	return &StreamListener{
		c:          c,
		cancelFunc: cancel,
		sessionID:  sessionID,
		mailBox:    make(chan []byte, mailBoxSize),
	}
}

func (rcvr *StreamListener) Listen() {
	for {
		select {
		case message := <-rcvr.mailBox:
			println(message)
			//TODO
			//sink.Send()
		case <-rcvr.c.Done():
			return
		}
	}
}

func (rcvr *StreamListener) Send(data []byte) {
	rcvr.mailBox <- data
}

func (rcvr *StreamListener) Close() {
	rcvr.cancelFunc()
}
