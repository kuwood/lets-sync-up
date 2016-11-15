import React from 'react'

const ChatMessage = (props) => {
  return (
    <p>{props.user}: {props.message}</p>
  )
}

export default ChatMessage
