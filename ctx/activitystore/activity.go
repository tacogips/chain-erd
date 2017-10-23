package activitystore

import (
	"context"
	"errors"
	"fmt"
	"sync"
)

type activityStoreKey int

var key activityStoreKey = 1

type ActivityData struct {
	ActivityID        string
	AffectedObjectIDs []string
	Event             interface{}
}

// defined error. this error will be throwed when only if Chomp() called and stores index is <= 0.
// when GetByID() called with in-exist activity ID it should be another error thrown.
var ErrorStoreEmpty = errors.New("there is no activity")

//ActivityStore ActivityStore is  a Stack style store. latest activity first out.
// And also enable map-like fetch by GetByID. These use when undo/redo a activities.
type ActivityStore interface {
	// All
	All(ActivityData) []ActivityData
	// Put
	Put(ActivityData)
	// GetByID get
	GetByID(string) (ActivityData, error)
	//Chomp return latest activity and set stores latest to previous one
	Chomp() (ActivityData, error)
}

//TODO tacogips use more sophisticated store
type OnMemoryActivityStore struct {
	l          *sync.Mutex
	curIndex   int
	activities []ActivityData
}

// All
func (oas *OnMemoryActivityStore) All(ActivityData) []ActivityData {
	//TODO  tacogips impl
	return nil
}

// Put
func (oas *OnMemoryActivityStore) Put(ActivityData) {
	//TODO  tacogips impl
}

// GetByID get
func (oas *OnMemoryActivityStore) GetByID(string) (ActivityData, error) {
	//TODO  tacogips impl
	return ActivityData{}, nil
}

//Chomp return latest activity and set stores latest to previous one
func (oas *OnMemoryActivityStore) Chomp() (ActivityData, error) {
	//TODO  tacogips impl
	return ActivityData{}, nil
}

func newOnMemoryActivityStore() *OnMemoryActivityStore {
	return &OnMemoryActivityStore{
		l:          &sync.Mutex{},
		curIndex:   0,
		activities: nil,
	}
}

// FromContext
func FromContext(c context.Context) ActivityStore {
	store, ok := c.Value(key).(ActivityStore)
	if !ok {
		panic(fmt.Errorf("no db store in the context "))
	}
	return store
}

// WithContext
func WithContext(c context.Context) (context.Context, error) {
	store := newOnMemoryActivityStore()
	c = context.WithValue(c, key, store)
	return c, nil
}
