import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as videoActions from '../actions/videoActions'

export class PlayerControls extends Component {
  constructor(props) {
    super(props)
    this.toggleState = this.toggleState.bind(this)
    this.setPosition = this.setPosition.bind(this)
  }

  setPosition(e) {
    const input = e.target.value
    console.log(e.target.value);
    this.props.dispatch(videoActions.setPosition(input))
  }

  toggleState() {
    if (this.props.playing) {
      this.props.dispatch(videoActions.pauseVideo())
    } else {
    this.props.dispatch(videoActions.playVideo())
    }
  }

  render() {
    return (
      <div className="player-controls">
        <input
          placeholder="Enter a time"
          onBlur={this.setPosition}
        />
        <button onClick={this.toggleState}>
          {this.props.playing ? "Pause" : "Play"}
        </button>
      </div>
    )
  }
}

let Container = connect()(PlayerControls)

export default Container
