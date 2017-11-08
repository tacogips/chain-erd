package gen

// FillWithDefault fill
func (e *Entity) FillWithDefault() {
	if e.Name == "" {
		e.Name = "NewEntity"
	}
}

// Validate
func (e *Entity) Validate() error {
	return nil
}
