import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, FormControl, Well, FormGroup, OverlayTrigger, Popover } from 'react-bootstrap'
import VideoSource from './VideoSource'
import * as videoActions from '../actions/videoActions'
import * as userActions from '../actions/userActions'
import * as roomActions from '../actions/roomActions'
import { socket } from '../index'

export class PlayerControls extends Component {
  constructor(props) {
    super(props)
    this.setPosition = this.setPosition.bind(this)
    this.toggleReady = this.toggleReady.bind(this)
    this.handlePositionInput = this.handlePositionInput.bind(this)

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
    this.state = {position: 0}
  }

  setPosition() {
    const {position} = this.state
    socket.emit('setPosition', {position, room: this.props.room.id})
    this.props.dispatch(videoActions.setPosition(position))
  }

  handlePositionInput(e) {
    const timeInSeconds = e.target.value * 1000
    this.setState({position: timeInSeconds})
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
    const positionPop = <Popover id="popover-positioned-bottom" title="Set video time">
      <FormGroup bsSize="small">
        <FormControl
          placeholder="Enter a time (in seconds)"
          onChange={this.handlePositionInput}
        />
        <Button style={{'margin-top': '5px'}} block onClick={this.setPosition}>Go!</Button>
      </FormGroup>
    </Popover>

    const positionInput = <OverlayTrigger
        rootClose
        trigger="click"
        placement="bottom"
        overlay={positionPop}
      >
        <Button>Set time</Button>
      </OverlayTrigger>
      
    const spacer = ' '
    let actionButton
    
    if (this.props.user.isOwner && 
        !this.props.room.isReady &&
        !this.props.playing) {
      actionButton = <Button disabled>
        Room not ready
      </Button>
    } else if (this.props.room.isReady &&
              this.props.user.isOwner) {
      actionButton = <Button onClick={this.toggleReady}>
        {this.props.user.isReady ? "pause" : "play"}
      </Button>
    } else {
      actionButton = <Button onClick={this.toggleReady}>
        {this.props.user.isReady ? "Not ready" : "Ready"}
      </Button>
    }

    const vidPop = <Popover id="popover-positioned-bottom" title="Input Video">
      <VideoSource room={this.props.room} refs={this.refs}/>
    </Popover>

    const vidSource = <OverlayTrigger
        rootClose
        trigger="click"
        placement="bottom"
        overlay={vidPop}
        ref={'sourceOverlay'}
      >
        <Button>Set input</Button>
      </OverlayTrigger>
    
    return (
      <Well bsClass="well text-center">
        <div className="inline-block">
          {this.props.user.isOwner && vidSource}
        </div>
        <div id="controls-right" className="inline-block">
          <Form inline>
            {this.props.user.isOwner && this.props.video.id && positionInput}
            {this.props.user.isOwner && this.props.video.id && spacer}
            {this.props.video.id && actionButton}
          </Form>
        </div>
      </Well>
    )
  }
}

const Container = connect()(PlayerControls)

export default Container
