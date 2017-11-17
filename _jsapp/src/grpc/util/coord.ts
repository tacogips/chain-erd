import {Coord } from 'grpc/erd_pb'

export function newCoord(x:number,y:number):Coord{
	const coord = new Coord()
	coord.setX(x)
	coord.setY(y)
	return  coord
}
