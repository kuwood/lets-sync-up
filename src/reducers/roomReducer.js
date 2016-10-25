import * as roomActions from '../actions/roomActions'

const initialState = {
  isReady: false
}

function roomReducer(state = initialState, action) {
  switch (action.type) {
    case roomActions.ROOM_READY:
      return Object.assign({}, state, {
        isReady: action.isReady
      })
    default:
      return state
  }
}

export default roomReducer
