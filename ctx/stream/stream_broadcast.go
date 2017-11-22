package stream

import (
	"context"
	"errors"

	"github.com/ajainc/chain/grpc/gen"
)

type key int

var broadcastKey key = 1

func WithContext(c context.Context, payload chan<- *gen.StreamPayload) context.Context {
	c = context.WithValue(c, broadcastKey, payload)
	return c
}

func fromContext(c context.Context) (chan<- *gen.StreamPayload, bool) {
	ch, ok := c.Value(broadcastKey).(chan<- *gen.StreamPayload)
	return ch, ok
}

func Broadcast(c context.Context, payload *gen.StreamPayload) error {
	if ch, ok := fromContext(c); !ok {
		return errors.New("broadcast channel not found") //TODO(taco) is to be panic better?
	} else {
		ch <- payload
	}
}
