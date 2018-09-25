package event

import (
	"context"

	"github.com/tacogips/chain-erd/grpc/gen"
)

type Event interface {
	EventID() string
	Description() string
	Exec(context.Context) error
	Undo(context.Context) error
	ExecStreamPayloads(context.Context) ([]*gen.StreamPayload, error) //TODO(taco) redundunt?
	UndoStreamPayloads(context.Context) ([]*gen.StreamPayload, error) //TODO(taco) redundunt?
}
