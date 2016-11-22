export const IS_READY = 'IS_READY'
export const IS_NOT_READY = 'IS_NOT_READY'
export const IS_OWNER = 'IS_OWNER'
export const ALIAS = 'ALIAS'

export const isReady = () => {
  return {
    type: IS_READY,
    isReady: true
  }
}

export const isNotReady = () => {
  return {
    type: IS_NOT_READY,
    isReady: false
  }
}

export const isOwner = (bool) => {
  return {
    type: IS_OWNER,
    isOwner: bool
  }
}

export const alias = (str) => {
  return {
    type: ALIAS,
    alias: str
  }
}
