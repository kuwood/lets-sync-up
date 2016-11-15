import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import ChatForm from './ChatForm'
import { socket } from '../index'
import * as chatActions from '../actions/chatActions'
import ChatMessage from './ChatMessage'

class Chat extends Component {
  constructor(props) {
    super(props)
    socket.on('chatMessage', data => {
      this.props.dispatch(chatActions.newMessage(data))
      let element = document.getElementById('chat-container')
      element.scrollTop = element.scrollHeight
    })
  }

  render() {
    return (
      <Panel collapsible defaultExpanded header="CHAT" bsStyle="info">
        <div id="chat-container" className="chat-container">
          {this.props.chat.messages.map((message, index) => {
            return <ChatMessage key={index} user={message.user} message={message.message}/>
          })}
        </div>
        <ChatForm room={this.props.room}/>
      </Panel>
    )
  }
}

export default connect()(Chat)
