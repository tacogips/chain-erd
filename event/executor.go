package event

import (
	"context"

	"github.com/tacogips/chain-erd/ctx/logger"
	"github.com/tacogips/chain-erd/grpc/gen"
)

// Exec execute  Event.Do() and puts it to activities stack
func Exec(c context.Context, ev Event, streamBroadcastCh chan *gen.StreamPayload) (*Activity, error) {

	var err error

	logger.Debugf(c, "execute event %#v", ev)

	err = ev.Exec(c)
	if err != nil {
		return nil, err
	}

	activity := NewActivity(ev)
	err = addActivityHistory(*activity)
	if err != nil {
		return nil, err
	}

	streamPayloads, err := ev.ExecStreamPayloads(c)
	if err != nil {
		logger.Error(c, err)
	} else {
		//TODO(taco) retry if error?
		go func() {
			logger.Debugf(c, "stream out exec result %#v", streamPayloads)
			for _, paylaod := range streamPayloads {
				streamBroadcastCh <- paylaod
			}
		}()
	}

	return activity, nil
}

//Undo execute ev.Undo()
func Undo(c context.Context, ev Event, streamBroadcastCh chan *gen.StreamPayload) error {

	logger.Debugf(c, "undo event %#v", ev)
	// TODO(tacogisp): impl
	ev.Undo(c)

	streamPayloads, _ := ev.UndoStreamPayloads(c)
	//TODO(taco) retry if error?
	go func() {
		logger.Debugf(c, "stream out undo result %#v", streamPayloads)
		for _, paylaod := range streamPayloads {
			streamBroadcastCh <- paylaod
		}
	}()

	return nil
}
