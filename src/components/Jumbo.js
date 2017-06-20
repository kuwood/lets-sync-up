import React, { Component } from 'react'
import { socket } from '../index'
import { Jumbotron, Button } from 'react-bootstrap'
import Logo from './Logo'

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
          <div className="directions-wrap">
            <div>
              <div className="directions-heading">
                <h3>Dont bother doing a "count down".</h3>
                <p className="directions-text">Simplify YouTube Synchronization in three easy steps.</p>
              </div>
            </div>
            <div className="directions-container">
              <div className="directions-block">
                <p className="directions-title">Create a room.</p>
                <p className="directions-text">Use the create a room button to get started with a generated room i.d. or click join room to create
                  one with a custom name.
                </p>
              </div>
              <div className="directions-block">
                <p className="directions-title">Get a youtube URL.</p>
                <p className="directions-text">Find a youtube video to share with the room, grab the url and use the "Set input video" button to set the
                  video for the room.
                </p>
              </div>
              <div className="directions-block">
                <p className="directions-title">Enjoy the video.</p>
                <p className="directions-text">Once you have set the video, you will need to wait until all users in the room have flagged
                  themselves as "ready". Once everyone is ready you can hit play!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jumbo
