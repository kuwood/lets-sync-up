import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, Popover, Form, FormGroup,FormControl,
  OverlayTrigger, NavDropdown, MenuItem } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { socket } from '../index'
import { browserHistory } from 'react-router'
import * as roomActions from '../actions/roomActions'
import * as videoActions from '../actions/videoActions'
import * as authActions from '../actions/authActions'
import LoginForm from './LoginForm'

export class Navigation extends Component {
  constructor(props) {
    super(props)
    this.createRoom = this.createRoom.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.profile = this.profile.bind(this)
    this.logout = this.logout.bind(this)
    this.home = this.home.bind(this)
    socket.on('roomRedirect', roomId => {
      browserHistory.push(`/room/${roomId}`);
      socket.emit('joinRoom', roomId)
      this.props.dispatch(roomActions.roomId(roomId));
    })
    socket.on('sendHome', () => {
      browserHistory.push(`/`)
    })
  }

  componentDidMount() {
    this.props.dispatch(authActions.requestProfile())
  }

  createRoom() {
    if (this.props.room.id) socket.emit('leaveRoom', this.props.room.id)
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

  profile() {
    browserHistory.push(`/profile`);
  }

  logout() {
    this.props.dispatch(authActions.authUser(false))
  }

  home() {
    browserHistory.push(`/`);
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
            <a onClick={this.home}>Lets sync up</a>
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
            {!this.props.auth.isAuthenticated ? (
            <NavItem eventKey={1}><Button bsStyle="primary" bsSize="xsmall">Sign up</Button></NavItem>
            ) : null}
            {!this.props.auth.isAuthenticated ? (
            <OverlayTrigger
              rootClose
              trigger="click"
              placement="bottom"
              overlay={
                <Popover id="popover-trigger-click-root-close" title="Enter username and password below">
                  <LoginForm />
                </Popover>
              }
            >
              <NavItem eventKey={2} href="#">Login</NavItem>
            </OverlayTrigger>
          ) : (
            <NavDropdown eventKey={3} title="Account" id="account-dropdown">
              <MenuItem eventKey={3.3} onClick={this.profile}>Profile</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3} onClick={this.logout} href="/logout">Logout</MenuItem>
            </NavDropdown>
          )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    room: state.room,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Navigation)
