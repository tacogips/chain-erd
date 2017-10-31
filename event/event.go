package event

import "context"

type Event interface {
	Description() string
	Exec(context.Context) error
	Undo(context.Context) error
}
