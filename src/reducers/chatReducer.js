import * as chatActions from '../actions/chatActions'

const initialState = {
  messages: []
}

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case chatActions.NEW_MESSAGE:
      return Object.assign({}, state, {
        messages: [
          ...state.messages,
          {
            user: action.user,
            message: action.message
          }
        ]
      })
    default:
      return state
  }
}

export default chatReducer
