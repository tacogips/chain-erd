package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	"github.com/ajainc/chain/ctx/activitystore"
	"github.com/ajainc/chain/ctx/graphdb"
	"github.com/ajainc/chain/ctx/idgen"
	chaingrpc "github.com/ajainc/chain/grpc"
)

//TODO (tacogips) implement commands with option
func main() {
	port := "50051"

	c := setupCtx()

	c, cancelContext := context.WithCancel(c)

	//  setup grpc server
	grpcServer, err := chaingrpc.Setup(c)
	if err != nil {
		panic(err)
	}

	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	go func() {
		log.Printf("staring server. listening %s", port)
		grpcServer.Serve(listener)
	}()

	waitChildrenDone := make(chan struct{})
	signals := make(chan os.Signal, 1)
	go func() {
		for {
			select {
			case <-c.Done:
				waitChildrenDone <- struct{}{}
			case <-sigs:
				cancelContext()
			}
		}
	}()

	<-waitChildrenDone
}

func setupCtx() context.Context {

	c := context.BackGround()

	// graphdb
	c, err = graphdb.WithContext(c)
	if err != nil {
		panic(err)
	}

	// activity store
	c := activitystore.WithContext(c)

	//  clock
	c, err = clock.WithContext(c, clock.New())
	if err != nil {
		panic(err)
	}

	// id generator
	c := idgen.WithContext(c)

	return c
}
