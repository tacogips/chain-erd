package event

import "github.com/ajainc/chain/grpc/gen"

type Activity struct {
	ActivityID string
	Event      Event
}

func (a *Activity) ToGRPCActivity() *gen.Activity {
	return &gen.Activity{
		ID:          a.ActivityID,
		Description: a.Event.Description(),
	}
}

// NewActivity createnewActivity
func NewActivity(event Event) *Activity {
	return &Activity{
		ActivityID: "test_activity", // TODO(tacogips): generate id
		Event:      event,
	}
}

// AddActivity add new activity to activity hisotry
func addActivityHistory(activity Activity) error {
	// TODO(tacogips): impl
	return nil
}

// GetActivityByID fetch the actiivty from acitivity history
func GetActivityByID(activity Activity) (Activity, bool) {
	// TODO(tacogips): impl
	return Activity{}, false
}
