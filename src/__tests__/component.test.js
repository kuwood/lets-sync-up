import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { PlayerControls } from '../components/PlayerControls'
import { App } from '../components/App'

describe('App', () => {
  const video = {
    playing: false
  }
  it('renders without crashing', () => {
    shallow(<App video={video} />)
  })
})

describe('PlayerControls', () => {
  it('renders without crashing', () => {
    const userState = {
      requestPause: false,
      isReady: false
    }
    const div = document.createElement('div')
    ReactDOM.render(
      <PlayerControls
        user={userState}
      />, div)
  })
})
