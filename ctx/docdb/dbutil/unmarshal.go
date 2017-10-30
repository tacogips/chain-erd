package dbutil

import (
	"github.com/ajainc/chain/grpc/gen"
	"github.com/fatih/structs"
	"github.com/mitchellh/mapstructure"
)

func UnmarshalEntity(src map[string]interface{}, dst *gen.Entity) error {
	return mapstructure.Decode(src, dst)
}

func MarshalEntity(entity gen.Entity) map[string]interface{} {
	return structs.Map(entity)
}
