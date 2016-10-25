import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as videoActions from '../actions/videoActions'
import * as userActions from '../actions/userActions'
import * as roomActions from '../actions/roomActions'

export class PlayerControls extends Component {
  constructor(props) {
    super(props)
    this.setPosition = this.setPosition.bind(this)
    this.toggleReady = this.toggleReady.bind(this)
    this.togglePauseRequest = this.togglePauseRequest.bind(this)
  }

  setPosition(e) {
    const input = e.target.value
    this.props.dispatch(videoActions.setPosition(input))
  }

  toggleReady() {
    if (this.props.user.isReady) {
      this.props.dispatch(userActions.isNotReady())
      this.props.dispatch(roomActions.roomReady(false))
      this.props.dispatch(videoActions.pauseVideo())
    } else {
    this.props.dispatch(userActions.isReady())
    this.props.dispatch(roomActions.roomReady(true))
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
      <div className="player-controls">
        <input
          placeholder="Enter a time"
          onBlur={this.setPosition}
        />
        <button onClick={this.toggleReady}>
          {this.props.user.isReady ? "not ready" : "ready"}
        </button>
        <button onClick={this.togglePauseRequest}>
          {this.props.user.requestPause ? "Request play" : "Request pause"}
        </button>
      </div>
    )
  }
}

let Container = connect()(PlayerControls)

export default Container
