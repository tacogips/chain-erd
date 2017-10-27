package event

import "context"

type Event interface {
	Do(context.Context) error
	Redo(context.Context) error
}
