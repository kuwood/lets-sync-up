import * as roomActions from '../actions/roomActions'

const initialState = {
  isReady: false,
  ownerReady: false,
  id: null,
  users: []
}

function roomReducer(state = initialState, action) {
  switch (action.type) {
    case roomActions.ROOM_READY:
      return Object.assign({}, state, {
        isReady: action.isReady
      })
    case roomActions.OWNER_READY:
      return Object.assign({}, state, {
        ownerReady: action.ownerReady
      })
    case roomActions.ROOM_ID:
      return Object.assign({}, state, {
        id: action.id
      })
    case roomActions.USERS:
      let list = []
      for (let index in action.users) {
        let user = action.users[index]
        let temp = list[0]
        if (user.isOwner) {
          list.push(temp)
          list[0] = user
        } else {
          list.push(user)
        }
      }
      return Object.assign({}, state, {
        users: list
      })
    default:
      return state
  }
}

export default roomReducer
