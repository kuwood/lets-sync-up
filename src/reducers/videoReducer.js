import * as videoActions from '../actions/videoActions'

const initialState = {
  playing: false,
  position: 0
}

function videoReducer(state = initialState, action) {
  switch (action.type) {
    case videoActions.PAUSE_VIDEO:
      return Object.assign({}, state, {
        playing: false
      })
    case videoActions.PLAY_VIDEO:
      return Object.assign({}, state, {
        playing: true
      })
    case videoActions.SET_POSITION:
      return Object.assign({}, state, {
        position: action.position
      })
    default:
      return state
  }
}

export default videoReducer
