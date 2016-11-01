import React, { Component } from 'react'
import { Well, Panel } from 'react-bootstrap'

class Chat extends Component {
  render () {
    return (
      <Panel header="CHAT">
        <Well>
          <div className="chat-container">
            <p>Chatter: chat chat chat</p>
          </div>
        </Well>
      </Panel>
    )
  }
}

export default Chat
