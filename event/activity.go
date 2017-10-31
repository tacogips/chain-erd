package event

type Activity struct {
	ActivityID string
	Event      Event
}

// NewActivity createnewActivity
func NewActivity(event Event) *Activity {
	return &Activity{
		ActivityID: "test_activity", // TODO(tacogips): generate id
		Event:      event,
	}
}

// AddActivity add new activity to activity hisotry
func addActivity(activity Activity) error {
	// TODO(tacogips): impl
	return nil
}

// GetActivityByID fetch the actiivty from acitivity history
func GetActivityByID(activity Activity) (Activity, bool) {
	// TODO(tacogips): impl
	return Activity{}, false
}
