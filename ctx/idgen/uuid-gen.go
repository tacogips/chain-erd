package idgen

import (
	"context"
	"fmt"

	uuid "github.com/satori/go.uuid"
)

type uuidGenKey int

var key uuidGenKey = 1

type IDGenerator interface {
	Gen() string
}

type defaultIDGenerator struct{}

func (_ defaultIDGenerator) Gen() string {
	u := uuid.NewV4()
	return u.String()
}

// FromContext
func FromContext(ctx context.Context) IDGenerator {
	gen, ok := ctx.Value(key).(IDGenerator)
	if !ok {
		panic(fmt.Errorf("no db store in the context "))
	}
	return gen
}

// WithContext
func WithContext(ctx context.Context) context.Context {
	ctx = context.WithValue(ctx, key, defaultIDGenerator{})
	return ctx
}

func SpecificWithContext(ctx context.Context, iDgen IDGenerator) context.Context {
	ctx = context.WithValue(ctx, key, iDgen)
	return ctx
}
