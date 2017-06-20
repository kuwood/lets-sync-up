import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { socket } from '../index'

export class ChatForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.state = {message: ''}
  }

  handleSubmit(e) {
    e.preventDefault()
    const message = this.state.message
    const room = this.props.room.id
    const data = {
      room: room,
      message: message
    }
    socket.emit('newMessage', data)
    this.setState({message: ''})
  }

  handleInput(e) {
    this.setState({message: e.target.value})
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <div className="chat-input-wrap">
            <div className="inline-block chat-input">
              <FormControl
                onChange={this.handleInput}
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
