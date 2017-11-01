package main

import (
	"context"
	"fmt"
	"net/http"
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

	port := 50051

	c, cancelContext := setupCtx()
	defer cancelContext()

	//  setup grpc server
	grpcwebServer, err := chaingrpc.Setup(c)
	if err != nil {
		panic(err)
	}

	handler := func(resp http.ResponseWriter, req *http.Request) {
		grpcwebServer.ServeHttp(resp, req)
	}

	grpcHttpServer := http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: http.HandlerFunc(handler),
	}

	go func() {
		logger.Infof(c, "server started. listening on :%d", port)
		grpcHttpServer.ListenAndServe() // TODO(tacogips): use HTTP/2
	}()

	waitShutdownDone := make(chan struct{})
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		for {
			select {
			case <-c.Done():
				logger.Debugf(c, "shutdowning server")
				err := docdb.Close(c)
				if err != nil {
					logger.Error(c, err)
				}
				waitShutdownDone <- struct{}{}
				return
			case <-sigs:
				cancelContext()
			}
		}
	}()

	<-waitShutdownDone
	logger.Info(c, "bye")
}

func setupCtx() (context.Context, context.CancelFunc) {
	c := context.Background()
	c, cancel := context.WithCancel(c)

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

	return c, cancel
}
