import * as authActions from '../actions/authActions'

const initialState = {
  isAuthenticated: false,
  username: null,
  signUpModal: false
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.AUTH_USER:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated
      })
    case authActions.USERNAME:
      return Object.assign({}, state, {
        username: action.username
      })
    case authActions.SIGN_UP_MODAL:
    return Object.assign({}, state, {
      signUpModal: action.signUpModal
    })
    default:
      return state
  }
}

export default authReducer
