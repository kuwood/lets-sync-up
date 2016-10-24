export const PAUSE_VIDEO = 'PAUSE_VIDEO'
export const PLAY_VIDEO = 'PLAY_VIDEO'
export const SET_POSITION = 'SET_POSITION'

export const pauseVideo = () => {
  return {
    type: PAUSE_VIDEO,
    playing: false
  }
}

export const playVideo = () => {
  return {
    type: PLAY_VIDEO,
    playing: true
  }
}

export const setPosition = (position) => {
  return {
    type: SET_POSITION,
    position: position
  }
}
