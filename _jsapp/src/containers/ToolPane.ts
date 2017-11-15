import { ToolPane as ToolPaneComp, ToolPaneProps } from 'components/ToolPane'
import { RootState } from 'modules/rootReducer'
import { actionCreators } from 'modules/control/actions'
import { connect, Dispatch } from 'react-redux'

const mapStateToProps = (state: RootState, ownProps: ToolPaneProps) => (<ToolPaneProps>{
    ...ownProps,
    preparingCreateEntity: state.control.creatingNewEntity
})

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: ToolPaneProps) => (<ToolPaneProps>{
    ...ownProps,
    pushEntityButton: () => {
        return dispatch(actionCreators.prepareNewEntity())
    }
})

export const ToolPane = connect(mapStateToProps, mapDispatchToProps)(ToolPaneComp)

