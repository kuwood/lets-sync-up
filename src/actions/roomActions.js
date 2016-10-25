export const ROOM_READY = 'ROOM_READY'

export const roomReady = (bool) => {
  return {
    type: ROOM_READY,
    isReady: bool
  }
}
