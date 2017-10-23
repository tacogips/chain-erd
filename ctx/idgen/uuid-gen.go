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
func FromContext(c context.Context) IDGenerator {
	gen, ok := c.Value(key).(IDGenerator)
	if !ok {
		panic(fmt.Errorf("no db store in the context "))
	}
	return gen
}

// WithContext
func WithContext(c context.Context) context.Context {
	c = context.WithValue(c, key, defaultIDGenerator{})
	return c
}

// SpecificWithContext
func SpecificWithContext(c context.Context, iDgen IDGenerator) context.Context {
	c = context.WithValue(c, key, iDgen)
	return c
}
