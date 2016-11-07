import React, { Component } from 'react'
import { connect } from 'react-redux'
import YouTubeVideo from 'stateful-react-youtube'
import { Panel } from 'react-bootstrap'
import { socket } from '../index'
import * as videoActions from '../actions/videoActions'

export class VideoContainer extends Component {
  constructor(props) {
    super(props)
    this.onPlayingChange = this.onPlayingChange.bind(this)
    this.setPosition = this.setPosition.bind(this)

    socket.on('setVideo', id => {
      console.log('setting id', id);
      this.props.dispatch(videoActions.setVideo(id))
    })
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
  else video = <p>Waiting for input video...</p>
    return (
      <Panel>
        {video}
      </Panel>
    )
  }
}

let Container = connect()(VideoContainer)

export default Container
