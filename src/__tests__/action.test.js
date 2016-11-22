import * as videoActions from '../actions/videoActions'
import * as userActions from '../actions/userActions'
import * as roomActions from '../actions/roomActions'
import * as chatActions from '../actions/chatActions'


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
  it('should create an action to set the video id', () => {
    const id = '123'
    const expectedAction = {
      type: videoActions.SET_VIDEO,
      id: id
    }
    expect(videoActions.setVideo(id)).toEqual(expectedAction)
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
  it('should create an action to set user as the owner or not', () => {
    const bool = true
    const expectedAction = {
      type: userActions.IS_OWNER,
      isOwner: bool
    }
    expect(userActions.isOwner(bool)).toEqual(expectedAction)
  })
  it('should create an action to set the alias', () => {
    const alias = 'cool guy'
    const expectedAction = {
      type: userActions.ALIAS,
      alias: alias
    }
    expect(userActions.alias(alias)).toEqual(expectedAction)
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

  it('should create an action to set the owner to ready', () => {
    const bool = true
    const expectedAction = {
      type: roomActions.OWNER_READY,
      ownerReady: bool
    }
    expect(roomActions.ownerReady(bool)).toEqual(expectedAction)
  })

  it('should create an action to set the room id', () => {
    const id = '123'
    const expectedAction = {
      type: roomActions.ROOM_ID,
      id: id
    }
    expect(roomActions.roomId(id)).toEqual(expectedAction)
  })

  it('should create an action to set the users', () => {
    const users = {'123': {'abc': true},'456': {'def': true}}
    const expectedAction = {
      type: roomActions.USERS,
      users: users
    }
    expect(roomActions.users(users)).toEqual(expectedAction)
  })
})

describe('chatActions', () => {
  it('should create an action to add a new message', () => {
    const newMessage = {user: 'cool guy', message: 'haha'}
    const expectedAction = {
      type: chatActions.NEW_MESSAGE,
      user: newMessage.user,
      message: newMessage.message
    }
    expect(chatActions.newMessage(newMessage)).toEqual(expectedAction)
  })
})
