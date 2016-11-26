import * as authActions from '../actions/authActions'

const initialState = {
  isAuthenticated: false,
  username: null
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
    default:
      return state
  }
}

export default authReducer
