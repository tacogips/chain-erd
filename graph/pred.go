package graph

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

	// stands for order of something.
	// e.g.
	//   column_1 come_before column_2
	//
	PredComeBefore = "come_before"
)
