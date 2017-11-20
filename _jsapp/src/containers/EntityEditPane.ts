import { EntityEditPane as EntityEditPaneComponent, EntityEditPaneProps } from 'components/EntityEditPane'

import { RootState } from 'modules/rootReducer'
import { actionCreators } from 'modules/control/actions'
import { connect, Dispatch } from 'react-redux'


const mapStateToProps = (state: RootState, ownProps: EntityEditPaneProps) => (<EntityEditPaneProps>{
    ...ownProps,
    currentSelectEntities: state.entity.currentSelectEntities
})

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: EntityEditPaneProps) => (<EntityEditPaneProps>{
    ...ownProps,
})

export const EntityEditPane = connect(mapStateToProps, mapDispatchToProps)(EntityEditPaneComponent)

