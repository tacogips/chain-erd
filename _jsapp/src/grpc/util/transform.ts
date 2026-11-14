
import { Transform ,CoordWH } from 'grpc/erd_pb'

export function newTransform(objectId:string,from:CoordWH,to:CoordWH) :Transform{
	const t = new Transform()
	t.setObjectId(objectId)
	t.setFrom(from)
	t.setTo(to)
	return t
}

