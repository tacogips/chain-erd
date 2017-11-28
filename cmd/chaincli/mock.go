package main

import (
	"context"
	"fmt"
	"time"

	"github.com/ajainc/chain/grpc/gen"
	"github.com/lunny/log"
	"github.com/satori/go.uuid"
	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial(":1212", grpc.WithInsecure())

	if err != nil {
		panic(err)
	}
	defer conn.Close()

	entityClient := gen.NewEntityServiceClient(conn)

	c := context.Background()

	ticker := time.NewTicker(3 * time.Second)

	for {
		select {
		case <-ticker.C:

			objectID := uuid.NewV4().String()
			entity := &gen.Entity{
				ObjectID: objectID,
				Name:     fmt.Sprintf("name-%s", objectID),
				Coord: &gen.Coord{
					X: 12.3,
					Y: 22.5,
				},
				WidthHeight: &gen.WidthHeight{
					W: 22.5,
					H: 30.1,
				},
				Color: "red",
			}

			activity, err := entityClient.CreateEntity(c, entity)
			if err != nil {
				log.Error(err)
			}
			fmt.Printf("%#v\n", activity)
		}
	}

}
