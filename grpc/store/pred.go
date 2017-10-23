package store

type Predicate string

const (
	PredColumn Predicate = "column"
	PredName             = "name"

	// relation
	PredOneToMany = "one_to_many"

	PredSize   = "size"
	PredWidth  = "width"
	PredHeight = "height"

	PredCoord  = "coord"
	PredCoordX = "x"
	PredCoordY = "y"
)
