import { combineReducers } from 'redux'
import videoReducer from './videoReducer'

const App = combineReducers({
  video: videoReducer
})

export default App
