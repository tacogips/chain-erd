.PHONY: clean-proto protoc

clean-proto:
	rm  -rf grpc/gen/*.pb.go
	rm  -rf _jsapp/src/grpc/*.ts

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

tsprotoc:
	protoc \
	--plugin=protoc-gen-ts=./_jsapp/node_modules/.bin/protoc-gen-ts \
	--ts_out=service=true:_jsapp/src/grpc  \
	-I grpc/_protobuf/ \
  --proto_path=grpc/_protobuf \
  --proto_path=./vendor \
	grpc/_protobuf/*.proto


cprotoc: clean-proto protoc tsprotoc

doc:
	 protoc \
		--doc_out=markdown:grpc/doc \
    --proto_path=grpc/_protobuf \
		./$${dir}/*.proto && cd - ; \

install-dev-deps:
	go get -u google.golang.org/grpc
	go get -u github.com/golang/protobuf/proto
	go get -u github.com/gogo/protobuf/jsonpb
	go get -u github.com/gogo/protobuf/protoc-gen-gogo
	go get -u github.com/gogo/protobuf/gogoproto
	go get -u github.com/gogo/protobuf/proto/...
