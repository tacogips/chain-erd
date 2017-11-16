import { Canvas as CanvasComponent, CanvasProps, CanvasPosition, CanvasClickAction } from 'components/Canvas'
import { RootState } from 'modules/rootReducer'
import { actionCreators as entityAction } from 'modules/entity/actions'
import { connect, Dispatch } from 'react-redux'
import { Entity, Coord, WidthHeight, Rel } from 'grpc/erd_pb'

const mapStateToProps = (state: RootState, ownProps: CanvasProps) => {

    let clickAction: CanvasClickAction
    let mouseOverPointer = 'default'
    if (state.control.creatingNewEntity) {
        mouseOverPointer = 'pointer';
        clickAction = CanvasClickAction.CREATE_NEW_ENTITY
    }

    return <CanvasProps>{
        ...ownProps,
        entities: {},
        clickAction: clickAction,
        mouseOverPointer: mouseOverPointer
    }
}

// TODO(tacogips) move somewhere out of canvas
function defaultEntity(position: CanvasPosition): Entity {
    const newEntity = new Entity()

    //const coord = new Coord()
    //coord.setX(position.layerX)
    //coord.setY(position.layerY)
    //newEntity.setCoord(coord)

    //const wh = new WidthHeight()
    //wh.setW(10)
    //wh.setH(10)
    //newEntity.setWidthHeight(wh)

    return newEntity
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: CanvasProps) => {

    const onClick = (canvasClickAciton:CanvasClickAction, clickPosition: CanvasPosition) => {
        switch (canvasClickAciton) {
            case CanvasClickAction.CREATE_NEW_ENTITY:
                //const newEntity = defaultEntity(clickPosition)
                //dispatch(entityAction.createNewEntity(newEntity))
        }
    }

    return <CanvasProps>{
        ...ownProps,
        onClick: onClick
    }
}

export const Canvas = connect(mapStateToProps, mapDispatchToProps)(CanvasComponent)

