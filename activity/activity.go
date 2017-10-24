package activity

import (
	"context"

	"github.com/ajainc/chain/ctx/activitystore"
	"github.com/ajainc/chain/ctx/idgen"
)

func newActivityID(c context.Context) string {
	g := idgen.FromContext(c)
	return g.Gen()
}

func Store(c context.Context, event interface{}) activitystore.ActivityData {
	activityID := newActivityID(c)

	astore := activitystore.FromContext(c)
	newActivity := activitystore.ActivityData{
		ActivityID: activityID,
		Event:      event,
	}
	astore.Put(newActivity)
	return newActivity
}
