import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, FormControl, Well, FormGroup, OverlayTrigger, Popover } from 'react-bootstrap'
import VideoSource from '../components/VideoSource'
import * as videoActions from '../actions/videoActions'
import * as userActions from '../actions/userActions'
import * as roomActions from '../actions/roomActions'
import { socket } from '../index'


export class PlayerControls extends Component {
  constructor(props) {
    super(props)
    this.setPosition = this.setPosition.bind(this)
    this.toggleReady = this.toggleReady.bind(this)

    socket.on('roomReady', bool => {
      this.props.dispatch(roomActions.roomReady(bool))
    })
    socket.on('isOwner', data => {
      this.props.dispatch(userActions.isOwner(true))
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
      socket.emit('setPosition', {position: input, room: this.props.room.id})
      this.props.dispatch(videoActions.setPosition(input))
    }
  }

  toggleReady() {
    if (this.props.user.isReady) {
      this.props.dispatch(userActions.isNotReady())
      socket.emit('isReady', {isReady: false, isOwner: this.props.user.isOwner, room: this.props.room.id})
      if (this.props.user.isOwner) {
        socket.emit('ownerReady', {ownerReady: false, room: this.props.room.id})
        this.props.dispatch(roomActions.ownerReady(false))
      }
    } else {
      this.props.dispatch(userActions.isReady())
      socket.emit('isReady', {isReady: true, isOwner: this.props.user.isOwner, room: this.props.room.id})
      if (this.props.user.isOwner) {
        socket.emit('setPosition', {position: this.props.video.position, room: this.props.room.id})
        socket.emit('ownerReady', {ownerReady: true, room: this.props.room.id})
        this.props.dispatch(roomActions.ownerReady(true))
      }
    }
  }

  render() {
    let buttons
    let positionInput
    let spacer
    const positionPop = <Popover id="popover-positioned-bottom" title="Set video time">
      <FormGroup bsSize="small">
        <FormControl
          placeholder="Enter a time (in seconds)"
          onBlur={this.setPosition}
        />
      </FormGroup>
    </Popover>
    if (this.props.user.isOwner) {
      positionInput = <OverlayTrigger
        rootClose
        trigger="click"
        placement="bottom"
        overlay={positionPop}
      >
        <Button>Set video time</Button>
      </OverlayTrigger>
      spacer = ' '
      if (!this.props.room.isReady && !this.props.playing) {
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
    const vidPop = <Popover id="popover-positioned-bottom" title="Input Video">
      <VideoSource room={this.props.room} />
    </Popover>
    let vidSource
    if (this.props.user.isOwner) {
      vidSource = <OverlayTrigger
        rootClose
        trigger="click"
        placement="bottom"
        overlay={vidPop}
      >
        <Button>Set input video</Button>
      </OverlayTrigger>
    }
    else vidSource = null

    return (
      <Well bsClass="well text-center">
        <div className="inline-block">
          {vidSource}
        </div>
        <div className="inline-block">
          <Form inline>
            {positionInput}
            {spacer}
            {buttons}
          </Form>
        </div>
      </Well>
    )
  }
}

let Container = connect()(PlayerControls)

export default Container
