export const NEW_MESSAGE = 'NEW_MESSAGE'
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

export const newMessage = (data) => {
  return {
    type: NEW_MESSAGE,
    user: data.user,
    message: data.message
  }
}

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  }
}
