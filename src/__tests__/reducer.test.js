import * as videoActions from '../actions/videoActions'
import * as userActions from '../actions/userActions'
import * as roomActions from '../actions/roomActions'
import videoReducer from '../reducers/videoReducer'
import userReducer from '../reducers/userReducer'
import roomReducer from '../reducers/roomReducer'

describe('videoReducer', () => {
  it('should return the initial state', () => {
    expect(
      videoReducer(undefined, {})
    ).toEqual({
      playing: false,
      position: 0
    })
  })

  it('should handle PAUSE_VIDEO', () => {
    expect(
      videoReducer(undefined, {
        type: videoActions.PAUSE_VIDEO,
        playing: false
      })
    ).toEqual({
        playing: false,
        position: 0
    })
    expect(
      videoReducer({
        playing: true,
        position: 1
      }, {
        type: videoActions.PAUSE_VIDEO,
        playing: false
      })
    ).toEqual({
      playing: false,
      position: 1
    })
  })

  it('should handle PLAY_VIDEO', () => {
    expect(
      videoReducer(undefined, {
        type: videoActions.PLAY_VIDEO,
        playing: true
      })
    ).toEqual({
        playing: true,
        position: 0
    })
    expect(
      videoReducer({
        playing: false,
        position: 1
      }, {
        type: videoActions.PLAY_VIDEO,
        playing: true
      })
    ).toEqual({
      playing: true,
      position: 1
    })
  })

  it('should handle SET_POSITION', () => {
    const position = 30000
    expect(
      videoReducer(undefined, {
        type: videoActions.SET_POSITION,
        position: position,
      })
    ).toEqual({
        playing: false,
        position: position
    })
    expect(
      videoReducer({
        playing: true,
        position: position
      }, {
        type: videoActions.SET_POSITION,
        position: position
      })
    ).toEqual({
      playing: true,
      position: position
    })
  })
})

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(
      userReducer(undefined, {})
    ).toEqual({
      requestPause: false,
      isReady: false
    })
  })

  it('should handle REQUEST_PAUSE_VIDEO', () => {
    expect(
      userReducer(undefined, {
        type: userActions.REQUEST_PAUSE_VIDEO,
        requestPause: true
      })
    ).toEqual({
      requestPause: true,
      isReady: false
    })
  })

  it('should handle REQUEST_PLAY_VIDEO', () => {
    expect(
      userReducer({
        requestPause: true,
        isReady: false
      }, {
        type: userActions.REQUEST_PLAY_VIDEO,
        requestPause: false
      })
    ).toEqual({
      requestPause: false,
      isReady: false
    })
  })

  it('should handle IS_READY', () => {
    expect(
      userReducer(undefined, {
        type: userActions.IS_READY,
        isReady: true
      })
    ).toEqual({
      requestPause: false,
      isReady: true
    })
  })

  it('should handle IS_NOT_READY', () => {
    expect(
      userReducer({
        requestPause: false,
        isReady: true
      }, {
        type: userActions.IS_NOT_READY,
        isReady: false
      })
    ).toEqual({
      requestPause: false,
      isReady: false
    })
  })
})

describe('roomReducer', () => {
  it('should return the inital state', () => {
    expect(
      roomReducer(undefined, {})
    ).toEqual({
      isReady: false
    })
  })

  it('should handle ROOM_READY', () => {
    expect(
      roomReducer(undefined, {
        type: roomActions.ROOM_READY,
        isReady: true
      })
    ).toEqual({
      isReady: true
    })
  })
})
