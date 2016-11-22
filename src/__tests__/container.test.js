import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { VideoContainer } from '../containers/VideoContainer'
import { RoomContainer } from '../containers/RoomContainer'

describe('VideoContainer', () => {
  const vid = {
    width: '100%',
    height: '100%',
    videoId: 'abcdefg',
    shouldPrestart: true,
    position: 0,
    playing: false
  }

  it('renders VideoContainer without crashing', () => {
    shallow(<VideoContainer
      width={vid.width}
      height={vid.height}
      videoId={vid.videoId}
      shouldPrestart={vid.shouldPrestart}
      position={vid.position}
      playing={vid.playing}
    />)
    shallow(<VideoContainer
      width={vid.width}
      height={vid.height}
      videoId={false}
      shouldPrestart={vid.shouldPrestart}
      position={vid.position}
      playing={vid.playing}
    />)
  })
})

describe('RoomContainer', () => {
  const state = {
    video: {
      playing: false,
      position: 0,
      id: null
    },
    chat: {
      messages: []
    },
    room: {
      isReady: false,
      ownerReady: false,
      id: null,
      users: []
    },
    user: {
      isReady: false,
      isOwner: false,
      alias: null
    }
  }
  it('renders RoomContainer without crashing', () => {
    shallow(<RoomContainer
      params={'123'}
      video={state.video}
      user={state.user}
      room={state.room}
      chat={state.chat}
    />)
  })
})
