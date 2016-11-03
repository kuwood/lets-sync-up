import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as videoActions from '../actions/videoActions'
import * as userActions from '../actions/userActions'
import * as roomActions from '../actions/roomActions'
import { socket } from '../index'
import { Panel, Button, Form, FormControl } from 'react-bootstrap'

export class PlayerControls extends Component {
  constructor(props) {
    super(props)
    this.setPosition = this.setPosition.bind(this)
    this.toggleReady = this.toggleReady.bind(this)

    socket.on('roomCount', data => {
      console.log('room count', data)
    });
    socket.on('isOwner', data => {
      this.props.dispatch(userActions.isOwner(true))
    })
    socket.on('roomReady', bool => {
      this.props.dispatch(roomActions.roomReady(bool))
      console.log(bool, 'roomready');
    })
    socket.on('roomOwnerStatus', bool => {
      this.props.dispatch(roomActions.ownerReady(bool))
      if (bool) {
        this.props.dispatch(videoActions.playVideo())
      } else {
        this.props.dispatch(videoActions.pauseVideo())
      }
    })
    socket.on('broadcastPosition', data => {
      this.props.dispatch(videoActions.setPosition(data))
    })
  }

  setPosition(e) {
    let input
    if (e.target.value) {
      input = e.target.value * 1000
      socket.emit('setPosition', input)
      this.props.dispatch(videoActions.setPosition(input))
    }
  }

  toggleReady() {
    if (this.props.user.isReady) {
      this.props.dispatch(userActions.isNotReady())
      socket.emit('isReady', {isReady: false, isOwner: this.props.user.isOwner})
      if (this.props.user.isOwner) {
        socket.emit('ownerReady', false)
        this.props.dispatch(roomActions.ownerReady(false))
      }
    } else {
      this.props.dispatch(userActions.isReady())
      socket.emit('isReady', {isReady: true, isOwner: this.props.user.isOwner})
      if (this.props.user.isOwner) {
        socket.emit('ownerReady', true)
        this.props.dispatch(roomActions.ownerReady(true))
      }
    }
  }

  render() {
    let buttons
    let positionInput
    let spacer
    if (this.props.user.isOwner) {
      positionInput = <FormControl
        placeholder="Enter a time (in seconds)"
        onBlur={this.setPosition}
      />
      spacer = ' '
      if (!this.props.room.isReady) {
        console.log('room isReady', this.props.room.isReady);
        buttons = <Button disabled>
          Room not ready
        </Button>
      } else {
        buttons = <Button onClick={this.toggleReady}>
          {this.props.user.isReady ? "pause" : "play"}
        </Button>
      }
    } else {
      buttons = <Button onClick={this.toggleReady}>
        {this.props.user.isReady ? "Not ready" : "Ready"}
      </Button>
    }

    return (
      <Panel >
        <Form inline>
          {positionInput}
          {spacer}
          {buttons}
        </Form>
      </Panel>
    )
  }
}

let Container = connect()(PlayerControls)

export default Container
