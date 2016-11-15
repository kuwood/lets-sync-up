export const NEW_MESSAGE = 'NEW_MESSAGE'

export const newMessage = (data) => {
  return {
    type: NEW_MESSAGE,
    user: data.user,
    message: data.message
  }
}
