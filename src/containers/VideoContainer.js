import React, { Component } from 'react'
import { connect } from 'react-redux'
import YouTubeVideo from 'stateful-react-youtube'
import * as videoActions from '../actions/videoActions'

export class VideoContainer extends Component {
  constructor(props) {
    super(props)
    this.onPlayingChange = this.onPlayingChange.bind(this)
    this.setPosition = this.setPosition.bind(this)
  }

  setPosition(position) {
    this.props.dispatch(videoActions.setPosition(position))
  }

  onPlayingChange(playing) {
    if (playing) {
      this.props.dispatch(videoActions.playVideo())
    } else {
      this.props.dispatch(videoActions.pauseVideo())
    }
  }

  render() {
    return (
      <YouTubeVideo
        width={this.props.width}
        height={this.props.height}
        videoId={this.props.videoId}
        shouldPrestart={this.props.shouldPrestart}
        position={this.props.position}
        playing={this.props.playing}
        onProgress={this.setPosition}
        onPlayingChange={this.onPlayingChange}
      />
    )
  }
}

let Container = connect()(VideoContainer)

export default Container
