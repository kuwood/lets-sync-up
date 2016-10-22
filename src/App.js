import React, { Component } from 'react';
import './App.css';
import VideoContainer from './containers/VideoContainer';
import PlayerControls from './components/PlayerControls';

const video = {
  videoId: 'gextz3oD634',
  width: '100%',
  height: '100%',
  shouldPrestart: false
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <VideoContainer
            width={video.width}
            height={video.height}
            videoId={video.videoId}
            shouldPrestart={video.shouldPrestart}
          />
          <PlayerControls />
        </p>
      </div>
    );
  }
}

export default App;
