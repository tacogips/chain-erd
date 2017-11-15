import { Canvas as CanvasComponent, CanvasProps } from 'components/Canvas'
import { RootState } from 'modules/rootReducer'
import { actionCreators } from 'modules/control/actions'
import { connect, Dispatch } from 'react-redux'

const mapStateToProps = (state: RootState, ownProps: ToolPaneProps) => (<CanvasProps>{
    ...ownProps,
    preparingCreateEntity: state.control.creatingNewEntity
})

const mapDispatchToProps = (dispatch: Dispatch<RootState>, ownProps: ToolPaneProps) => (<CanvasProps>{
    ...ownProps,
    pushEntityButton: () => {
        return dispatch(actionCreators.prepareNewEntity())
    }
})

export const ToolPane = connect(mapStateToProps, mapDispatchToProps)(ToolPaneComp)

