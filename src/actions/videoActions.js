export const PAUSE_VIDEO = 'PAUSE_VIDEO'
export const PLAY_VIDEO = 'PLAY_VIDEO'
export const SET_POSITION = 'SET_POSITION'

export const pauseVideo = (isOwner) => {
  return {
    type: PAUSE_VIDEO,
    playing: false,
    isOwner: isOwner
  }
}

export const playVideo = (isOwner) => {
  return {
    type: PLAY_VIDEO,
    playing: true,
    isOwner: isOwner
  }
}

export const setPosition = (position) => {
  return {
    type: SET_POSITION,
    position: position
  }
}
