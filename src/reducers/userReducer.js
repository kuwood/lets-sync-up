import * as userActions from '../actions/userActions'

const initialState = {
  requestPause: false,
  isReady: false
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.REQUEST_PAUSE_VIDEO:
      return Object.assign({}, state, {
        requestPause: true
      })
    case userActions.REQUEST_PLAY_VIDEO:
      return Object.assign({}, state, {
        requestPause: false
      })
    case userActions.IS_READY:
      return Object.assign({}, state, {
        requestPause: false,
        isReady: true
      })
    case userActions.IS_NOT_READY:
      return Object.assign({}, state, {
        isReady: false
      })
    default:
      return state
  }
}

export default userReducer
