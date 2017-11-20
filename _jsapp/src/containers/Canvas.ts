import { Canvas as CanvasComponent, CanvasProps, CanvasClickAction } from 'components/Canvas'
import { EventPosition,layerPositionToCoord} from 'components/util/event_position'

import { RootState } from 'modules/rootReducer'
import { actionCreators as entityAction, DefaultlSize, DefaultlEntityColor } from 'modules/entity'
import { connect, Dispatch } from 'react-redux'
import { Entity, Coord, WidthHeight, Rel } from 'grpc/erd_pb'

import {newEntity} from 'grpc/util/entity'
import {newColumn} from 'grpc/util/column'


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
				currentSelectEntities:state.entity.currentSelectEntities,
        clickAction: clickAction,
        mouseOverPointer: mouseOverPointer
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: CanvasProps) => {

    const onClick = (canvasClickAciton: CanvasClickAction, clickPosition: EventPosition) => {
        switch (canvasClickAciton) {
            case CanvasClickAction.CREATE_NEW_ENTITY:
								layerPositionToCoord(clickPosition)
                dispatch(entityAction.createNewEntity(newEntity(layerPositionToCoord(clickPosition))))
        }
    }

    return <CanvasProps>{
        ...ownProps,
        onClick: onClick
    }
}

export const Canvas = connect(mapStateToProps, mapDispatchToProps)(CanvasComponent)

