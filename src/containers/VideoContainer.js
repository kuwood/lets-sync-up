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
    let myPlayer = document.getElementById('widget2')
    if (playing) {
      this.props.dispatch(videoActions.playVideo(this.props.isOwner))
      //disables iframe play/pause button
      if (!this.props.room.isReady) {
        myPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      }
    } else {
      this.props.dispatch(videoActions.pauseVideo(this.props.isOwner))
      //disables iframe play/pause button
      if (this.props.room.isReady) {
        myPlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      }
    }
  }

  render() {
    return (
      <YouTubeVideo
        width={this.props.width}
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
