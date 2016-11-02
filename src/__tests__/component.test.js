import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { PlayerControls } from '../components/PlayerControls'
import { App } from '../components/App'

describe('App', () => {
  const video = {
    playing: false
  }
  const userState = {
    isOwner: false,
    isReady: false
  }
  it('renders App component without crashing', () => {
    shallow(<App video={video} user={userState} />)
  })
})

describe('PlayerControls', () => {
  it('renders PlayerControls without crashing', () => {
    const userState = {
      isOwner: false,
      isReady: false
    }
    const div = document.createElement('div')
    ReactDOM.render(
      <PlayerControls
        user={userState}
      />, div)
  })
})
