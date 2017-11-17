import { Coord, CoordWH, WidthHeight } from 'grpc/erd_pb'

export function newCoord(x: number, y: number): Coord {
    const coord = new Coord()
    coord.setX(x)
    coord.setY(y)
    return coord
}

export function newCoordWH(
    coord: { x: number, y: number },
    widthHeight: { w: number, h: number }): CoordWH {

    const cwh = new CoordWH()
    const c = new Coord()
    c.setX(coord.x)
    c.setY(coord.y)

    cwh.setCoord(c)

    const wh = new WidthHeight()
    wh.setW(widthHeight.w)
    wh.setH(widthHeight.h)

    cwh.setWidthHeight(wh)

    return cwh
}
