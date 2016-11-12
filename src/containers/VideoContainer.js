import React, { Component } from 'react'
import { connect } from 'react-redux'
import YouTubeVideo from 'stateful-react-youtube'
import { Panel } from 'react-bootstrap'

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
    // disallows using ifram pause/play
    let myPlayer = document.getElementById('widget2')
    if (!this.props.room.ownerReady) {
      console.log('owner not ready should pause');
      myPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    } else {
      console.log('owner is ready should play');
      myPlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    }
  }

  render() {
    let video
    if (this.props.videoId) video = <YouTubeVideo
      width={this.props.width}
      videoId={this.props.videoId}
      shouldPrestart={this.props.shouldPrestart}
      position={this.props.position}
      playing={this.props.playing}
      onProgress={this.setPosition}
      onPlayingChange={this.onPlayingChange}
    />
  else video = <h2>Waiting for input video...</h2>
    return (
      <div className="vid-container">
        {video}
      </div>
    )
  }
}

let Container = connect()(VideoContainer)

export default Container
