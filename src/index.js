import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import App from './components/App'
import './css/main.css'
import io from 'socket.io-client'
export let socket = io.connect("http://localhost:8080")

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})
