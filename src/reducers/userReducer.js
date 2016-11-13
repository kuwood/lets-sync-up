import * as userActions from '../actions/userActions'

const initialState = {
  isReady: false,
  isOwner: false
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.IS_READY:
      return Object.assign({}, state, {
        isReady: true
      })
    case userActions.IS_NOT_READY:
      return Object.assign({}, state, {
        isReady: false
      })
    case userActions.IS_OWNER:
      return Object.assign({}, state, {
        isOwner: action.isOwner
      })
    default:
      return state
  }
}

export default userReducer
