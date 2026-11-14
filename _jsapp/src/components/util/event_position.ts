
import { Coord, CoordWH, WidthHeight } from 'grpc/erd_pb'
import { newCoord } from 'grpc/util/coord'

export interface EventPosition {
    clientX: number
    clientY: number

    layerX: number
    layerY: number

    pageX: number
    pageY: number

    screenX: number
    screenY: number
}



export function positionFromEvent(evtVal: any): EventPosition {
    const nullOrZero = (v: any) => {
        return (!v) ? 0 : +v
    }
    return {
        clientX: nullOrZero(evtVal.clientX),
        clientY: nullOrZero(evtVal.clientY),
        layerX: nullOrZero(evtVal.layerX),
        layerY: nullOrZero(evtVal.layerY),
        pageX: nullOrZero(evtVal.pageX),
        pageY: nullOrZero(evtVal.pageY),
        screenX: nullOrZero(evtVal.screenX),
        screenY: nullOrZero(evtVal.screenY),
    }
}

export function layerPositionToCoord(eventPosition: EventPosition): Coord {
    return newCoord(eventPosition.layerX, eventPosition.layerY)
}

export interface PositionFunction extends Function {
    (anchorPosition: EventPosition): void;
}
