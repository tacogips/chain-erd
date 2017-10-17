.PHONY: clean-proto protoc

clean-proto:
	rm  -rf grpc/gen/*.pb.go

protoc:
	protoc \
    --proto_path=grpc/_protobuf \
    --proto_path=./vendor \
		--gogo_out=\
Mgoogle/protobuf/any.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/duration.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/struct.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types,\
Mgoogle/protobuf/wrappers.proto=github.com/gogo/protobuf/types,\
plugins=grpc:./grpc/gen \
	  grpc/_protobuf/*.proto

cprotoc: clean-proto protoc
