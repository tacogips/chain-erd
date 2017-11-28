package gen

func NewEntitySteamPayload(ope StreamPayload_Operation, entity *Entity) *StreamPayload {
	return &StreamPayload{
		Operation: ope,
		Object: &StreamPayload_Entity{
			entity,
		},
	}
}

func NewRelationSteamPayload(ope StreamPayload_Operation, rel *Rel) *StreamPayload {
	return &StreamPayload{
		Operation: ope,
		Object: &StreamPayload_Rel{
			rel,
		},
	}
}
