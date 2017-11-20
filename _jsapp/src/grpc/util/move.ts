import { Move, Coord } from 'grpc/erd_pb'

export function newMove(objectId: string, from: Coord, to: Coord): Move {
    const move = new Move()
    move.setObjectId(objectId)
    move.setFrom(from)
    move.setTo(to)
    return move
}
