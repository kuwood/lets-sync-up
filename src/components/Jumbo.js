import React, { Component } from 'react'
import { socket } from '../index'
import { Jumbotron, Button } from 'react-bootstrap'
import Logo from './Logo'
import Directions from './Directions'

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
      <div className="splash">
        <div className="jumbo-wrap">
          <div className="container main-container">
            <Jumbotron>         
              <Logo />
              <h1>Experience Youtube together.</h1>
              <p>Let's sync up lets you syncronize playback of youtube videos between users in a room.</p>
              <Button type="button" bsStyle="custom" onClick={this.createRoom}>Create a room</Button>
            </Jumbotron>
          </div>
          <Directions />
        </div>
      </div>
    )
  }
}

export default Jumbo
