import * as videoActions from '../actions/videoActions'
import * as userActions from '../actions/userActions'
import * as roomActions from '../actions/roomActions'


describe('videoActions', () => {
  it('should create an action to pause the video', () => {
    const expectedAction = {
      type: videoActions.PAUSE_VIDEO,
      playing: false
    }
    expect(videoActions.pauseVideo()).toEqual(expectedAction)
  })
  it('should create an action to play the video', () => {
    const expectedAction = {
      type: videoActions.PLAY_VIDEO,
      playing: true
    }
    expect(videoActions.playVideo()).toEqual(expectedAction)
  })
  it('should create an action to set the video position', () => {
    const position = 30000
    const expectedAction = {
      type: videoActions.SET_POSITION,
      position: position
    }
    expect(videoActions.setPosition(position)).toEqual(expectedAction)
  })
})

describe('userActions', () => {
  it('should create an action to set user as being ready', () => {
    const expectedAction = {
      type: userActions.IS_READY,
      isReady: true
    }
    expect(userActions.isReady()).toEqual(expectedAction)
  })
  it('should create an action to set user as not ready', () => {
    const expectedAction = {
      type: userActions.IS_NOT_READY,
      isReady: false
    }
    expect(userActions.isNotReady()).toEqual(expectedAction)
  })
})

describe('roomActions', () => {
  it('should create an action to set the room to ready', () => {
    const bool = true
    const expectedAction = {
      type: roomActions.ROOM_READY,
      isReady: bool
    }
    expect(roomActions.roomReady(bool)).toEqual(expectedAction)
  })
})
