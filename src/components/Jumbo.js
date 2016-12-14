import React, { Component } from 'react'
import { socket } from '../index'
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap'

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
          <div className="container">
            <Jumbotron>
              <h1>Experience Youtube together.</h1>
              <p>Let's sync up lets you syncronize playback of youtube videos between users in a room.</p>
              <p>All you need to get started is a youtube url for the video source.
                The user that creates the room will have control options to set the video time, start/stop playback and kick users from the room.
              </p>
              <p>To get started click "Create a room"</p>
              <Button type="button" bsStyle="custom" onClick={this.createRoom}>Create a room</Button>
            </Jumbotron>
          </div>
        </div>
      </div>
    )
  }
}

// <div className="three-wrap">
//   <div className="container">
//     <ThreeIcon />
//   </div>
// </div>
export default Jumbo
