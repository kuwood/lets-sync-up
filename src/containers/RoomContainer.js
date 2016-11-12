import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
// import Jumbo from '../components/Jumbo'

import VideoContainer from './VideoContainer'
import PlayerControls from '../components/PlayerControls'
import Chat from '../components/Chat'
import { socket } from '../index'
import * as roomActions from '../actions/roomActions'
import * as videoActions from '../actions/videoActions'

class RoomContainer extends Component {
  constructor(props) {
    super(props)
    socket.emit('joinRoom', this.props.params.roomName)
    // this.props.dispatch(roomActions.roomId(this.props.params.roomName))
    socket.on('setVideo', id => {
      console.log('setting id', id);
      this.props.dispatch(videoActions.setVideo(id))
    })
  }

  componentDidMount() {
    this.props.dispatch(roomActions.roomId(this.props.params.roomName))
  }

  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
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

export default connect(mapStateToProps)(RoomContainer);