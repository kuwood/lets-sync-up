import * as videoActions from '../actions/videoActions'
import * as userActions from '../actions/userActions'
import * as roomActions from '../actions/roomActions'
import * as chatActions from '../actions/chatActions'
import videoReducer from '../reducers/videoReducer'
import userReducer from '../reducers/userReducer'
import roomReducer from '../reducers/roomReducer'
import chatReducer from '../reducers/chatReducer'

describe('videoReducer', () => {
  it('should return the initial state', () => {
    expect(
      videoReducer(undefined, {})
    ).toEqual({
      id: null,
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
        id: null,
        playing: false,
        position: 0
    })
    expect(
      videoReducer({
        id: null,
        playing: true,
        position: 1
      }, {
        type: videoActions.PAUSE_VIDEO,
        playing: false
      })
    ).toEqual({
      id: null,
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
        id: null,
        playing: true,
        position: 0
    })
    expect(
      videoReducer({
        id: null,
        playing: false,
        position: 1
      }, {
        type: videoActions.PLAY_VIDEO,
        playing: true
      })
    ).toEqual({
      id: null,
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
        id: null,
        playing: false,
        position: position
    })
    expect(
      videoReducer({
        id: null,
        playing: true,
        position: position
      }, {
        type: videoActions.SET_POSITION,
        position: position
      })
    ).toEqual({
      id: null,
      playing: true,
      position: position
    })
  })

  it('handle SET_VIDEO', () => {
    expect(
      videoReducer(undefined, {
        type: videoActions.SET_VIDEO,
        id: "abcd"
      })
    ).toEqual({
      id: "abcd",
      playing: false,
      position: 0
    })
  })
})

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(
      userReducer(undefined, {})
    ).toEqual({
      alias: '',
      isOwner: false,
      isReady: false,
      aliasModal: false
    })
  })

  it('should handle IS_READY', () => {
    expect(
      userReducer(undefined, {
        type: userActions.IS_READY,
        isReady: true
      })
    ).toEqual({
      alias: '',
      isOwner: false,
      isReady: true,
      aliasModal: false
    })
  })

  it('should handle IS_NOT_READY', () => {
    expect(
      userReducer({
        isOwner: false,
        isReady: true,
        alias: '',
        aliasModal: false
      }, {
        type: userActions.IS_NOT_READY,
        isReady: false
      })
    ).toEqual({
      isOwner: false,
      isReady: false,
      alias: '',
      aliasModal: false
    })
  })

  it('should handle IS_OWNER', () => {
    expect(
      userReducer(undefined, {
        type: userActions.IS_OWNER,
        isOwner: true
      })
    ).toEqual({
      isOwner: true,
      isReady: false,
      alias: '',
      aliasModal: false
    })
  })

  it('should handle ALIAS', () => {
    expect(
      userReducer(undefined, {
        type: userActions.ALIAS,
        alias: 'cool guy'
      })
    ).toEqual({
      alias: 'cool guy',
      isOwner: false,
      isReady: false,
      aliasModal: false
    })
  })
})

describe('roomReducer', () => {
  it('should return the inital state', () => {
    expect(
      roomReducer(undefined, {})
    ).toEqual({
      id: null,
      isReady: false,
      ownerReady: false,
      users: []
    })
  })

  it('should handle ROOM_READY', () => {
    expect(
      roomReducer(undefined, {
        type: roomActions.ROOM_READY,
        isReady: true
      })
    ).toEqual({
      id: null,
      isReady: true,
      ownerReady: false,
      users: []
    })
  })

  it('should handle OWNER_READY', () => {
    expect(
      roomReducer(undefined, {
        type: roomActions.OWNER_READY,
        ownerReady: true
      })
    ).toEqual({
      id: null,
      isReady: false,
      ownerReady: true,
      users: []
    })
  })

  it('should handle ROOM_ID', () => {
    expect(
      roomReducer(undefined, {
        type: roomActions.ROOM_ID,
        id: '123'
      })
    ).toEqual({
      id: '123',
      isReady: false,
      ownerReady: false,
      users: []
    })
  })

  it('should handle USERS', () => {
    expect(
      roomReducer(undefined, {
        type: roomActions.USERS,
        users: {"abcd": {"1234": true}, "efgh": {"5678": true, "isOwner": true}}
      })
    ).toEqual({
      id: null,
      isReady: false,
      ownerReady: false,
      users: [{"5678": true, "isOwner": true},{"1234": true}]
    })
  })
})

describe('chatReducer', () => {
  it('should return the initial state', () => {
    expect(
      chatReducer(undefined, {})
    ).toEqual({
      messages: []
    })
  })

  it('should handle NEW_MESSAGE', () => {
    expect(
      chatReducer(undefined, {
        type: chatActions.NEW_MESSAGE,
        user: 'user1',
        message: 'rocks'
      })
    ).toEqual({
      messages: [{user: 'user1', message: 'rocks'}]
    })
  })
})
