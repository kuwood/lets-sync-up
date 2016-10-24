import React, { Component } from 'react'
import { connect } from 'react-redux'
import VideoContainer from '../containers/VideoContainer'
import PlayerControls from './PlayerControls'

const video = {
  videoId: 'gextz3oD634',
  width: '100%',
  height: '100%',
  shouldPrestart: false
}

export class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Lets sync up</h2>
        </div>
        <div className="controls-container">
          <PlayerControls playing={this.props.playing}/>
          <p className="stats">Playing: {this.props.playing.toString()}</p>
          <p className="stats">{Math.round(this.props.position)}ms</p>
        </div>
        <div className="video-container">
          <VideoContainer
            width={video.width}
            height={video.height}
            videoId={video.videoId}
            shouldPrestart={video.shouldPrestart}
            playing={this.props.playing}
            position={this.props.position}
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
    playing: state.video.playing,
    position: state.video.position
  }
}

let Container = connect(mapStateToProps)(App)

export default Container
