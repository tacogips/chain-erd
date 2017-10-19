package store

type Predicate string

const (
	PredHasColumn Predicate = "HasColumn"
	PredVersion             = "Version"

	PredHasWidth  = "HasWidth"
	PredHasHeight = "HasHeight"

	PredAtCoordinateX = "AtCoordinateX"
	PredAtCoordinateY = "AtCoordinateY"
)
