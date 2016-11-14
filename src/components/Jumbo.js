import React, { Component } from 'react'
import { socket } from '../index'
import { Jumbotron, Button } from 'react-bootstrap'


export class Jumbo extends Component {
  constructor(props) {
    super(props)
    this.createRoom = this.createRoom.bind(this)
  }
  createRoom() {
    socket.emit('createRoom')
  }
  render() {
    return (
      <div className="jumbo-wrap">
        <div className="container">
          <Jumbotron>
            <h1>Experience Youtube together.</h1>
            <p>Let's sync up lets you syncronize playback of youtube videos between users in a room.</p>
            <p>To get started click "Create a room"</p>
            <Button bsStyle="primary" onClick={this.createRoom}>Create a room</Button>
          </Jumbotron>
        </div>
      </div>
    )
  }
}

export default Jumbo
