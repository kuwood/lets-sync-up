import { combineReducers } from 'redux'
import videoReducer from './videoReducer'
import userReducer from './userReducer'
import roomReducer from './roomReducer'

const App = combineReducers({
  video: videoReducer,
  user: userReducer,
  room: roomReducer
})

export default App
