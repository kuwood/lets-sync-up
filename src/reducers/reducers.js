import { combineReducers } from 'redux'
import videoReducer from './videoReducer'
import userReducer from './userReducer'
import roomReducer from './roomReducer'
import chatReducer from './chatReducer'

const App = combineReducers({
  video: videoReducer,
  user: userReducer,
  room: roomReducer,
  chat: chatReducer
})

export default App
