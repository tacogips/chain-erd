package event

import "context"

type Event interface {
	Description() string
	Do(context.Context) error
	Redo(context.Context) error
}
