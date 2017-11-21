import { EntityPanel as EntityPanelComponent, EntityPanelProps } from 'components/EntityPanel'

import { actionCreators as controlActionCreators } from 'modules/control/actions'
import { actionCreators as relationActionCreators } from 'modules/relation'

import { RootState } from 'modules/rootReducer'
import { actionCreators } from 'modules/entity/actions'
import { connect, Dispatch } from 'react-redux'

import { Move,Transform,CoordWH  } from 'grpc/erd_pb'

import { positionFromEvent, EventPosition, PositionFunction } from 'components/util/event_position'

const mapStateToProps = (state: RootState, ownProps: EntityPanelProps) => (<EntityPanelProps>{
    ...ownProps,
})

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: EntityPanelProps) => (<EntityPanelProps>{
    ...ownProps,

    onSelect: (objectId: string) => {
         dispatch(controlActionCreators.cancelAction()) // cancel what you doing
         dispatch(actionCreators.selectEntity(objectId))
    },

    onRelease: (objectId: string) => {
        //TODO(tacogips)
        //return dispatch(actionCreators.selectEntity(objectId))
    },

    onMoving: (pos: EventPosition) => {
			console.debug(pos)
		},

    onMoveEnd: (move: Move) => {
        dispatch(controlActionCreators.cancelAction()) // cancel what you doing
        return dispatch(actionCreators.moveEntity(move))
    },

    onTransforming: (objectId: string, coordWH: CoordWH) => {
        return dispatch(actionCreators.transformingEntity(objectId,coordWH))
		},

    onTransformFinished: (transform: Transform) => {
        dispatch(controlActionCreators.cancelAction()) // cancel what you doing
        return dispatch(actionCreators.transformFinishedEntity(transform))
		}

})

export const EntityPanel = connect(mapStateToProps, mapDispatchToProps)(EntityPanelComponent)

