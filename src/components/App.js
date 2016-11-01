import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import VideoContainer from '../containers/VideoContainer'
import PlayerControls from './PlayerControls'
import Navigation from './Navigation'
import Chat from './Chat'

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
        <Navigation />
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <VideoContainer
                width={testVideo.width}
                height={testVideo.height}
                videoId={testVideo.videoId}
                shouldPrestart={testVideo.shouldPrestart}
                playing={this.props.video.playing}
                position={this.props.video.position}
              />
              <PlayerControls
                playing={this.props.video.playing}
                user={this.props.user}
                room={this.props.room}
              />
              <p className="stats">Playing: {this.props.video.playing.toString()}</p>
              <p className="stats">{Math.round(this.props.video.position)}ms</p>
            </Col>
            <Col xs={12} md={4}>
              <Chat />
            </Col>
          </Row>
        </Grid>

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
