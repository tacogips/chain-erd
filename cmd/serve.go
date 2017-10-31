package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	"github.com/ajainc/chain/ctx/docdb"
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
	sigs := make(chan os.Signal, 1)

	signal.Notify(sigs, syscall.SITINT, syscall.SIGTERM)

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

	// docdb
	c, err = docdb.WithContext(c)
	if err != nil {
		panic(err)
	}

	//  clock
	c, err = clock.WithContext(c, clock.New())
	if err != nil {
		panic(err)
	}

	return c
}
