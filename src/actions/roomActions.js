export const ROOM_READY = 'ROOM_READY'
export const OWNER_READY = 'OWNER_READY'

export const roomReady = (bool) => {
  return {
    type: ROOM_READY,
    isReady: bool
  }
}

export const ownerReady = (bool) => {
  return {
    type: OWNER_READY,
    ownerReady: bool
  }
}
