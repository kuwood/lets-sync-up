import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { socket } from '../index'

import VideoContainer from './VideoContainer'
import PlayerControls from '../components/PlayerControls'
import Chat from '../components/Chat'
import RoomControl from '../components/RoomControl'
import * as roomActions from '../actions/roomActions'

export class RoomContainer extends Component {
  componentDidMount() {
    // if room id is not set on mount, set it to the url/params
    if (!this.props.room.id) {
      this.props.dispatch(roomActions.roomId(this.props.params.roomName))
      socket.emit('joinRoom', this.props.params.roomName)
    }
  }

  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={10}>
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
            <Chat room={this.props.room} chat={this.props.chat}/>
          </Col>
          <Col xs={12} md={2}>
            <RoomControl
              auth={this.props.auth}
              alias={this.props.user.alias}
              roomId={this.props.room.id}
              users={this.props.room.users}
              isOwner={this.props.user.isOwner}
              modal={this.props.user.aliasModal}
            />
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
    room: state.room,
    chat: state.chat,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(RoomContainer);
