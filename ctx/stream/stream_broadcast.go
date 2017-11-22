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

func FromContext(c context.Context) chan<- *gen.StreamPayload {
	ch, ok := c.Value(broadcastKey).(chan<- *gen.StreamPayload)
	if !ok {
		panic(errors.New("now stream broad cast channel"))
	}
	return ch
}

func Broadcast(c context.Context, payload *gen.StreamPayload) error {
	if ch := FromContext(c); !ok {
		ch <- payload
	}
	return nil
}
