import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import Jumbo from './Jumbo'
import VideoSource from './VideoSource'
import VideoContainer from '../containers/VideoContainer'
import PlayerControls from './PlayerControls'
import Navigation from './Navigation'
import Chat from './Chat'

const testVideo = {
  videoId: 'gextz3oD634'
}

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <Jumbo />
            </Col>
            <Col xs={12} md={8}>
              <VideoSource />
              <VideoContainer
                width={"100%"}
                height={"100%"}
                videoId={this.props.video.id}
                shouldPrestart
                playing={this.props.video.playing}
                position={this.props.video.position}
                user={this.props.user}
                room={this.props.room}
              />
              <PlayerControls
                playing={this.props.video.playing}
                user={this.props.user}
                room={this.props.room}
                video={this.props.video}
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
