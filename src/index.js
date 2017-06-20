import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import io from 'socket.io-client'
import store from './store'
import App from './components/App'
import Jumbo from './components/Jumbo'
import RoomContainer from './containers/RoomContainer'
import './css/main.css'
export const socket = io()

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Jumbo} />
          <Route path="room" component={RoomContainer}>
            <Route path=":roomName"></Route>
          </Route>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  )
})
