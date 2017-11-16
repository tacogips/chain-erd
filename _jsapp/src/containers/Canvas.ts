import { Canvas as CanvasComponent, CanvasProps, CanvasPosition, CanvasClickAction } from 'components/Canvas'
import { RootState } from 'modules/rootReducer'
import { actionCreators as entityAction, DefaultlSize, DefaultlEntityColor } from 'modules/entity'
import  * as uuidv4  from 'uuid/v4'
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
        entities: state.entity.entities,
        clickAction: clickAction,
        mouseOverPointer: mouseOverPointer
    }
}

// TODO(tacogips) move somewhere out of canvas
function defaultEntity(position: CanvasPosition): Entity {
    const newEntity = new Entity()

    newEntity.setObjectId(uuidv4())

    const coord = new Coord()
    coord.setX(position.layerX)
    coord.setY(position.layerY)
    newEntity.setCoord(coord)

    const wh = new WidthHeight()
    wh.setW(DefaultlSize.W)
    wh.setH(DefaultlSize.H)
    newEntity.setWidthHeight(wh)

    newEntity.setColor(DefaultlEntityColor.DEFAULT_ENTITY_COLOR)

    return newEntity
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: CanvasProps) => {

    const onClick = (canvasClickAciton: CanvasClickAction, clickPosition: CanvasPosition) => {
        switch (canvasClickAciton) {
            case CanvasClickAction.CREATE_NEW_ENTITY:
                const newEntity = defaultEntity(clickPosition)
                dispatch(entityAction.createNewEntity(newEntity))
        }
    }

    return <CanvasProps>{
        ...ownProps,
        onClick: onClick
    }
}

export const Canvas = connect(mapStateToProps, mapDispatchToProps)(CanvasComponent)

