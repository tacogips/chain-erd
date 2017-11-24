package event

import (
	"context"

	"github.com/ajainc/chain/grpc/gen"
)

// Exec execute  Event.Do() and puts it to activities stack
func Exec(c context.Context, ev Event, streamBroadcastCh chan *gen.StreamPayload) (*Activity, error) {

	var err error

	err = ev.Exec(c)
	if err != nil {
		return nil, err
	}

	activity := NewActivity(ev)
	err = addActivityHistory(*activity)
	if err != nil {
		return nil, err
	}

	streamPayloads, _ := ev.ExecStreamPayloads(c)
	//TODO(taco) retry if error?
	go func() {
		for _, paylaod := range streamPayloads {
			streamBroadcastCh <- paylaod
		}
	}()

	return activity, nil
}

//Undo execute ev.Undo()
func Undo(c context.Context, ev Event, streamBroadcastCh chan *gen.StreamPayload) error {
	// TODO(tacogisp): impl
	ev.Undo(c)

	streamPayloads, _ := ev.ExecStreamPayloads(c)
	//TODO(taco) retry if error?
	go func() {
		for _, paylaod := range streamPayloads {
			streamBroadcastCh <- paylaod
		}
	}()

	return nil
}
