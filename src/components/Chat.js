import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

class Chat extends Component {
  render () {
    return (
      <Panel collapsible defaultExpanded header="CHAT" bsStyle="info">
        <div className="chat-container">
          <p>Chatter: chat chat chat</p>
        </div>
      </Panel>
    )
  }
}

export default Chat
