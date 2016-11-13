import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import App from './reducers/reducers'

let store = createStore(App, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store
