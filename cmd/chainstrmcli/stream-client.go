package main

import (
	"context"
	"fmt"
	"io"

	"github.com/ajainc/chain/grpc/gen"
	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial(":50051")

	if err != nil {
		panic(err)
	}

	defer conn.Close()

	streamClient := gen.NewStreamServiceClient(conn)

	c := context.Background()
	req := &gen.StreamConnectReq{
		Authed: &gen.Authed{
			SessionID: "sess_abc",
		},
		Action: gen.StreamConnectReq_REGISTER,
	}

	streamConnCli, err := streamClient.Connect(c, req)

	if err != nil {
		panic(err)
	}

	for {
		payload, err := streamConnCli.Recv()
		if err != nil {
			if err == io.EOF {
				return
			} else {
				panic(err)
			}
		}
		switch obj := payload.Object.(type) {
		case *gen.StreamPayload_Entity:
			fmt.Printf("%#v\n", obj)
		case *gen.StreamPayload_Rel:
			fmt.Printf("%#v\n", obj)
		default:
		}

	}

}
