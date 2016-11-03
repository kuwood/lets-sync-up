import * as roomActions from '../actions/roomActions'

const initialState = {
  isReady: false,
  ownerReady: false
}

function roomReducer(state = initialState, action) {
  switch (action.type) {
    case roomActions.ROOM_READY:
      return Object.assign({}, state, {
        isReady: action.isReady
      })
    case roomActions.OWNER_READY:
      return Object.assign({}, state, {
        ownerReady: action.ownerReady
      })
    default:
      return state
  }
}

export default roomReducer
