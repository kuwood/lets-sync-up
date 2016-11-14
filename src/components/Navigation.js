import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, Popover, Form, FormGroup,FormControl, OverlayTrigger } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { socket } from '../index'
import { browserHistory} from 'react-router'
import * as roomActions from '../actions/roomActions'
import * as videoActions from '../actions/videoActions'



export class Navigation extends Component {
  constructor(props) {
    super(props)
    this.createRoom = this.createRoom.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    socket.on('roomRedirect', data => {
      browserHistory.push(`/room/${data}`);
      this.props.dispatch(roomActions.roomId(data));
    })
  }

  createRoom() {
    socket.emit('createRoom')
  }

  joinRoom(e) {
    e.preventDefault()
    if (this.props.room.id) socket.emit('leaveRoom', this.props.room.id)
    let room = ReactDOM.findDOMNode(this.roomId).value
    this.props.dispatch(videoActions.setVideo(null))
    browserHistory.push(`/room/${room}`);
    socket.emit('joinRoom', room)
    this.props.dispatch(roomActions.roomId(room))
  }

  render() {
    const joinPop = (
      <Popover id="popover-trigger-click-root-close" title="Enter room id">
        <Form inline onSubmit={this.joinRoom}>
          <FormGroup bsSize="small">
            <FormControl
              ref={input => {this.roomId = input}}
              type="text"
              placeholder="room..."
            />
            {' '}
            <Button type="submit" bsSize="small" onClick={this.joinRoom}>
              Go!
            </Button>
          </FormGroup>
        </Form>
      </Popover>
    );
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Lets sync up</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={this.createRoom}>Create a room</NavItem>
              <OverlayTrigger
                rootClose
                trigger="click"
                placement="bottom"
                overlay={joinPop}
              >
                <NavItem eventKey={2}>Join a room</NavItem>
              </OverlayTrigger>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1}><Button bsStyle="primary" bsSize="xsmall">Sign up</Button></NavItem>
            <NavItem eventKey={2} href="#">Login</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    room: state.room
  }
}

export default connect(mapStateToProps)(Navigation)
