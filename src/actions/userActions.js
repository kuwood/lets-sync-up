export const REQUEST_PLAY_VIDEO = 'REQUEST_PLAY_VIDEO'
export const REQUEST_PAUSE_VIDEO = 'REQUEST_PAUSE_VIDEO'
export const IS_READY = 'IS_READY'
export const IS_NOT_READY = 'IS_NOT_READY'

export const requestPlayVideo = () => {
  return {
    type: REQUEST_PLAY_VIDEO,
    requestPause: false
  }
}

export const requestPauseVideo = () => {
  return {
    type: REQUEST_PAUSE_VIDEO,
    requestPause: true
  }
}

export const isReady = () => {
  return {
    type: IS_READY,
    requestPause: false,
    isReady: true
  }
}

export const isNotReady = () => {
  return {
    type: IS_NOT_READY,
    isReady: false
  }
}
