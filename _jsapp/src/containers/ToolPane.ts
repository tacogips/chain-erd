import { ToolPane as ToolPaneComponent, ToolPaneProps } from 'components/ToolPane'

import { RootState } from 'modules/rootReducer'
import { actionCreators } from 'modules/control/actions'
import { connect, Dispatch } from 'react-redux'


const mapStateToProps = (state: RootState, ownProps: ToolPaneProps) => (<ToolPaneProps>{
    ...ownProps,
    preparingCreateEntity: state.control.creatingNewEntity
})

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: ToolPaneProps) => (<ToolPaneProps>{
    ...ownProps,
    onCreateSingleEntityButton: () => {
        return dispatch(actionCreators.prepareToCreateEntity())
    },

    onRepeatCreateEntityButton: () => {
        return dispatch(actionCreators.prepareToRepeatedlyCreateEntity())
    }
})

export const ToolPane = connect(mapStateToProps, mapDispatchToProps)(ToolPaneComponent)

