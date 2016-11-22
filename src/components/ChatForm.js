import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { socket } from '../index'

export class ChatForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let message = ReactDOM.findDOMNode(this.messageInput).value
    let room = this.props.room.id
    let data = {
      room: room,
      message: message
    }
    socket.emit('newMessage', data)
    ReactDOM.findDOMNode(this.messageInput).value = ""
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <div className="chat-input-wrap">
            <div className="inline-block chat-input">
              <FormControl
                ref={input => {this.messageInput = input}}
              />
            </div>
            <div className="inline-block">
              <Button type="submit">Send</Button>
            </div>
          </div>
        </FormGroup>
      </Form>
    )
  }
}

export default ChatForm;
