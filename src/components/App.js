import React, { Component } from 'react'
import { connect } from 'react-redux'
import VideoContainer from '../containers/VideoContainer'
import PlayerControls from './PlayerControls'

const testVideo = {
  videoId: 'gextz3oD634',
  width: '100%',
  height: '100%',
  shouldPrestart: true
}

export class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Lets sync up</h2>
        </div>
        <div className="controls-container">
          <PlayerControls
            playing={this.props.video.playing}
            user={this.props.user}
            room={this.props.room}
          />
          <p className="stats">Playing: {this.props.video.playing.toString()}</p>
          <p className="stats">{Math.round(this.props.video.position)}ms</p>
        </div>
        <div className="video-container">
          <VideoContainer
            width={testVideo.width}
            height={testVideo.height}
            videoId={testVideo.videoId}
            shouldPrestart={testVideo.shouldPrestart}
            playing={this.props.video.playing}
            position={this.props.video.position}
          />
        </div>
        <div className="chat-container">
          <p>chat</p>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    video: state.video,
    user: state.user,
    room: state.room
  }
}

let Container = connect(mapStateToProps)(App)

export default Container
