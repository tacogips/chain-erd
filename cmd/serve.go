package main

import (
	"context"
	"fmt"
	"net"
	"os"
	"os/signal"
	"syscall"

	clk "github.com/101loops/clock"
	"github.com/Sirupsen/logrus"
	"github.com/ajainc/chain/ctx/clock"
	"github.com/ajainc/chain/ctx/docdb"
	"github.com/ajainc/chain/ctx/logger"
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
		logger.Fatalf(c, "failed to start server: %v", err)
	}

	go func() {
		logger.Info(c, "failed to start server: %v", err)
		grpcServer.Serve(listener)
	}()

	waitChildrenDone := make(chan struct{})
	sigs := make(chan os.Signal, 1)

	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		for {
			select {
			case <-c.Done():
				waitChildrenDone <- struct{}{}
			case <-sigs:
				cancelContext()
			}
		}
	}()

	<-waitChildrenDone
}

func setupCtx() context.Context {
	c := context.Background()

	var err error
	// logger
	loggerConfig := logger.TTYLogger
	loggerConfig.SetLevel(logrus.DebugLevel) // TODO(tacogips): always debug mode between pre-alpha
	c, err = logger.WithContext(c, loggerConfig)
	if err != nil {
		panic(err)
	}

	// docdb
	c, err = docdb.WithContext(c, docdb.Config{})
	if err != nil {
		panic(err)
	}

	//  clock
	c = clock.WithContext(c, clk.New())
	if err != nil {
		panic(err)
	}

	return c
}
