package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	"github.com/ajainc/chain/ctx/graphdb"
	chaingrpc "github.com/ajainc/chain/grpc"
)

//TODO (tacogips) implement commands with option
func main() {
	port := "50051"

	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	ctx, cancelContext := context.WithCancel(context.Background())

	// graphdb
	ctx, err = graphdb.WithContext(ctx)
	if err != nil {
		panic(err)
	}

	grpcServer, err := chaingrpc.Setup(ctx)
	if err != nil {
		panic(err)
	}

	go func() {
		log.Printf("staring server. listening %s", port)
		grpcServer.Serve(listener)
	}()

	waitShutdown := make(chan struct{})
	signals := make(chan os.Signal, 1)
	go func() {
		for {
			select {
			case <-ctx.Done:
				waitShutdown <- struct{}{}
			case <-sigs:
				cancelContext()
			}
		}
	}()

	<-waitShutdown
}
