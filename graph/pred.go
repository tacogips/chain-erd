package graph

type Predicate string

func (p Predicate) String() string {
	return string(p)
}

// Predicates
const (
	PredIs string = "<is>"

	PredColumn Predicate = "<column>"
	PredName             = "<name>"

	// relation
	PredRelOne  = "<rel_one>"
	PredRelMany = "<rel_many>"

	PredSizeWidth  = "<size_width>"
	PredSizeHeight = "<size_height>"

	PredCoordX = "<coord_x>"
	PredCoordY = "<coord_y>"

	// stands for order of something.
	// e.g.
	//   column_1 come_before column_2
	PredComeBefore = "<come_before>"
)
