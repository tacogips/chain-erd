package event

import "context"

// Exec execute  Event.Do() and puts it to activities stack
func Exec(c context.Context, ev Event) (*Activity, error) {
	var err error

	err = ev.Exec(c)
	if err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}

	activity := NewActivity(ev)
	err = addActivity(*activity)
	if err != nil {
		return nil, err
	}

	return activity, nil
}

//Undo execute ev.Undo()
func Undo(c context.Context, ev Event) error {
	// TODO(tacogisp): impl
	ev.Undo(c)
	return nil
}
