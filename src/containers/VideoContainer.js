import React, { Component } from 'react';
import YouTubeVideo from 'stateful-react-youtube';

class VideoContainer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <YouTubeVideo
        width={this.props.width}
        height={this.props.height}
        videoId={this.props.videoId}
        shouldPrestart={this.props.shouldPrestart}
      />
    )
  }
}

export default VideoContainer;
