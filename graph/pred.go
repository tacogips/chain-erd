package graph

type Predicate string

const (
	PredColumn Predicate = "column"
	PredName             = "name"

	// relation
	PredOneToMany = "one_to_many"

	PredSizeWidth  = "size_width"
	PredSizeHeight = "size_height"

	PredCoordX = "coord_x"
	PredCoordY = "coord_y"

	// stands for order of something.
	// e.g.
	//   column_1 come_before column_2
	PredComeBefore = "come_before"
)
