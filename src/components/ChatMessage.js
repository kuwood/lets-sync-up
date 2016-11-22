import React from 'react'

export const ChatMessage = (props) => {
  return (
    <p>{props.user}: {props.message}</p>
  )
}

export default ChatMessage
