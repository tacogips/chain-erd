package clock

import (
	"context"

	clk "github.com/101loops/clock"
)

type key int

var clockKey key = 1

func NewContext(c context.Context, cl clk.Clock) context.Context {
	c = context.WithValue(c, clockKey, cl)
	return c
}

func FromContext(c context.Context) (clk.Clock, bool) {
	cl, ok := c.Value(clockKey).(clk.Clock)
	return cl, ok
}
