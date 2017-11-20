import * as actions from './actions'
import { Reducer } from 'redux'

export interface ControlState {
    creatingNewEntity: boolean
		connectingOneToMenyRel:boolean
    repeatAction: boolean
}

export const initialState: ControlState = {
    creatingNewEntity: false,
    connectingOneToMenyRel: false,
    repeatAction: false
}

// reducer
export const controlReducer: Reducer<ControlState> = (state: ControlState = initialState, action: actions.ControlAction) => {
    switch (action.type) {
        case actions.ControlActionTypes.PREPARE_NEW_ENTIY:
            return <ControlState>{
                ...state,
                creatingNewEntity: true,
								repeatAction :action.payload.repeat
            }

        case actions.ControlActionTypes.FINISH_CREATE_ENTITY:
            return <ControlState>{
                ...state,
                creatingNewEntity: false,
								repeatAction :false
            }

        case actions.ControlActionTypes.CANCEL_ACTION:
					//TODO (tacogips) should be  more elegant
          return <ControlState>{
              ...state,
              creatingNewEntity: false,
							repeatAction :false
          }


        case actions.ControlActionTypes.CONNECTING_ONE_TO_MENY_REL:
					//TODO (tacogips) should be  more elegant
          return <ControlState>{
              ...state,
              creatingNewEntity: false,
							repeatAction :false
          }


        case actions.ControlActionTypes.CANCEL_ACTION:
          return  initialState

			case actions.ControlActionTypes.CONNECTING_ONE_TO_MENY_REL:
          return <ControlState>{
              ...state,
              connectingOneToMenyRel: true,
          }

			case actions.ControlActionTypes.FINISH_CONNECTING_REL:
          return <ControlState>{
              ...state,
              connectingOneToMenyRel: false,
          }

        default:
            return state
    }
}


