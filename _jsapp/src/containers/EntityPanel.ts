import { EntityPanel as EntityPanelComponent, EntityPanelProps } from 'components/EntityPanel'

import { actionCreators as controlActionCreators } from 'modules/control/actions'

import { RootState } from 'modules/rootReducer'
import { actionCreators } from 'modules/entity/actions'
import { connect, Dispatch } from 'react-redux'

import { Move,Transform,CoordWH  } from 'grpc/erd_pb'

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

    onMove: (move: Move) => {
        dispatch(controlActionCreators.cancelAction()) // cancel what you doing
        return dispatch(actionCreators.moveEntity(move))
    },

    onTransforming: (objectId: string, coordWH: CoordWH) => {
        dispatch(controlActionCreators.cancelAction()) // cancel what you doing
        return dispatch(actionCreators.transformingEntity(objectId,coordWH))
		},

    onTransformFinished: (objectId: string, coordWH: Transform) => {
			//    transformFinishedEntity: (objectId: string, transform: Transform) => {
			//        return <TransformFinishedEntity>{
			//            type: EntityActionTypes.TRANSFORM_FINISHED_ENTITY,
			//            payload: transform
			//        }
		}


})

export const EntityPanel = connect(mapStateToProps, mapDispatchToProps)(EntityPanelComponent)

