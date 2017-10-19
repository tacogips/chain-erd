package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/ajainc/chain/ctx/graphdb"
	chaingrpc "github.com/ajainc/chain/grpc"
)

//TODO tacogips implmenet commands
func main() {
	port := "50051"

	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	ctx := context.Background()

	var graphdbOnCloseFn func() error
	ctx, graphdbOnCloseFn, err = graphdb.WithContext(ctx, "", nil)
	if err != nil {
		panic(err)
	}

	defer graphdbOnCloseFn()

	server, err := chaingrpc.Setup(ctx)
	if err != nil {
		panic(err)
	}
	log.Printf("staring server.listening %s", port)
	server.Serve(listener)
}
