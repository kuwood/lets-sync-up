import * as authActions from '../actions/authActions'

const initialState = {
  isAuthenticated: false
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.AUTH_USER:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated
      })
    default:
      return state
  }
}

export default authReducer
