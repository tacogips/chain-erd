package dbutil

//func ConvToObj(src interface{}, dst interface{}) error {
//	dstVal := reflect.ValueOf(dst)
//	if dstVal.Kind() != reflect.Ptr || dstVal.IsNil() {
//		return fmt.Errorf("dst must be non Nil pointer")
//	}
//
//	if m, ok := src.(map[string]interface{}); !ok {
//		fmt.Errorf("object must be map[string]interface{} but [%#v]", src)
//	} else {
//		structs.FillMap()
//	}
//}
//
//func IsMapStruct(src interface{}) bool {
//	_, ok := src.(map[string]interface{})
//	return ok
//}
