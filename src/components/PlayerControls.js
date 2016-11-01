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
    this.togglePauseRequest = this.togglePauseRequest.bind(this)
    socket.on('join attempt', data => {
        console.log(data);
        socket.emit('join success', 'user joined testRoom');
    });
    socket.on('roomCount', data => {
      console.log('room count', data);
    });
    socket.on('roomReady', data => {
      this.props.dispatch(roomActions.roomReady(data))
      if (data) this.props.dispatch(videoActions.playVideo())
      else this.props.dispatch(videoActions.pauseVideo())
      console.log(data, 'roomready');
    })
    socket.on('broadcastPosition', data => {
      this.props.dispatch(videoActions.setPosition(data))
    })
  }

  setPosition(e) {
    let input
    if (e.target.value) {
      input = e.target.value
      socket.emit('setPosition', input)
      this.props.dispatch(videoActions.setPosition(input))
    }
  }

  toggleReady() {
    if (this.props.user.isReady) {
      this.props.dispatch(userActions.isNotReady())
      this.props.dispatch(roomActions.roomReady(false))
      socket.emit('isReady', false)
      this.props.dispatch(videoActions.pauseVideo())
    } else {
    this.props.dispatch(userActions.isReady())
    this.props.dispatch(roomActions.roomReady(true))
    socket.emit('isReady', true)
    this.props.dispatch(videoActions.playVideo())
    }
  }

  togglePauseRequest() {
    if (this.props.user.requestPause) {
      this.props.dispatch(userActions.requestPlayVideo())
    } else {
      this.props.dispatch(userActions.requestPauseVideo())
    }
  }

  render() {
    return (
      <Panel >
        <Form inline>
          <FormControl
            placeholder="Enter a time"
            onBlur={this.setPosition}
          />
          {' '}
          <Button onClick={this.toggleReady}>
            {this.props.user.isReady ? "not ready" : "ready"}
          </Button>
          {' '}
          <Button onClick={this.togglePauseRequest}>
            {this.props.user.requestPause ? "Request play" : "Request pause"}
          </Button>
        </Form>
      </Panel>
    )
  }
}

let Container = connect()(PlayerControls)

export default Container
