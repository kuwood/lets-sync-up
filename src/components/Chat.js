import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import ChatForm from './ChatForm'
import { socket } from '../index'
import * as chatActions from '../actions/chatActions'
import ChatMessage from './ChatMessage'

export class Chat extends Component {
  constructor(props) {
    super(props)

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
