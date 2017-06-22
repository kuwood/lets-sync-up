import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, Popover, Form, FormGroup,FormControl,
  OverlayTrigger, NavDropdown, MenuItem } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { socket } from '../index'
import { browserHistory } from 'react-router'
import * as roomActions from '../actions/roomActions'
import * as videoActions from '../actions/videoActions'
import * as authActions from '../actions/authActions'
import * as userActions from '../actions/userActions'
import * as chatActions from '../actions/chatActions'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

export class Navigation extends Component {
  constructor(props) {
    super(props)
    this.createRoom = this.createRoom.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.showModal = this.showModal.bind(this)
    this.profile = this.profile.bind(this)
    this.logout = this.logout.bind(this)
    this.home = this.home.bind(this)
    this.state = {roomId: ''}
  }

  componentDidMount() {
    this.props.dispatch(authActions.checkAuth())
    // server emits from createRoom event
    socket.on('roomRedirect', roomId => {
      browserHistory.push(`/room/${roomId}`);
      if (!this.props.room.id) {
        this.props.dispatch(roomActions.roomId(roomId));
        socket.emit('joinRoom', roomId)
      }
    })
    // getes called from server kickUser
    socket.on('sendHome', () => {
      browserHistory.push(`/`)
    })
    socket.on('setVideo', id => {
      this.props.dispatch(videoActions.setVideo(id))
    })
    socket.on('users', usersList => {
      this.props.dispatch(roomActions.users(usersList))
    })
    socket.on('requestAlias', defaultAlias => {
      if (this.props.auth.isAuthenticated) {
        const aliasData = {roomId: this.props.room.id, name: this.props.alias}
        socket.emit('setAlias', aliasData)
      } else {
        this.props.dispatch(userActions.alias(defaultAlias))
        this.props.dispatch(userActions.aliasModal(true))
      }
    })
    socket.on('chatMessage', data => {
      this.props.dispatch(chatActions.newMessage(data))
      if (this.props.room.id) {
        const element = document.getElementById('chat-container')
        element.scrollTop = element.scrollHeight
      }
    })
  }

  createRoom() {
    if (this.props.room.id) socket.emit('leaveRoom', this.props.room.id)
    this.props.dispatch(roomActions.roomId(null))
    this.props.dispatch(chatActions.clearMessages())
    socket.emit('createRoom')
  }

  handleRoomInput(e) {
    this.setState({roomId: e.target.value})
  }

  joinRoom(e) {
    e.preventDefault()
    if (this.props.room.id) socket.emit('leaveRoom', this.props.room.id)
    this.props.dispatch(roomActions.roomId(null))
    this.props.dispatch(videoActions.setVideo(null))
    this.props.dispatch(chatActions.clearMessages())

    const {roomId} = this.state

    browserHistory.push(`/room/${roomId}`);
    this.props.dispatch(roomActions.roomId(roomId))
    socket.emit('joinRoom', roomId)
    if (this.props.auth.isAuthenticated) {
      const data = {
        roomId: roomId,
        name: this.props.alias
      }
      socket.emit('setAlias', data)
    }
    // handle hide manually
    this.refs.joinPop.handleHide()
  }

  showModal() {
    this.props.dispatch(authActions.signUpModal(true))
  }

  profile() {
    browserHistory.push(`/profile`);
  }

  logout() {
    this.props.dispatch(authActions.authUser(false))
  }

  home() {
    if (this.props.room.id) socket.emit('leaveRoom', this.props.room.id)
    browserHistory.push(`/`);
    this.props.dispatch(videoActions.setVideo(null))
    this.props.dispatch(roomActions.roomId(null))
    this.props.dispatch(chatActions.clearMessages())
  }

  render() {
    const joinPop = (
      <Popover id="popover-trigger-click-root-close" title="Enter room id">
        <Form inline onSubmit={this.joinRoom}>
          <FormGroup bsSize="small">
            <FormControl
              onChange={this.handleRoomInput.bind(this)}
              value={this.state.roomId}
              type="text"
              placeholder="room..."
            />
            {' '}
            <Button type="submit" bsSize="small">
              Go!
            </Button>
          </FormGroup>
        </Form>
      </Popover>
    )
    return (
      <Navbar inverse>
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
              ref={'joinPop'}
            >
              <NavItem eventKey={2}>Join a room</NavItem>
            </OverlayTrigger>
          </Nav>
          <Nav pullRight>
            <SignUpForm modal={this.props.auth.signUpModal} />
            {!this.props.auth.isAuthenticated ? (
              <NavItem eventKey={1} className="blue" onClick={this.showModal}>Sign up</NavItem>
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
            <NavDropdown eventKey={3} title={`${this.props.auth.username}`} id="account-dropdown">
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
    auth: state.auth,
    alias: state.user.alias
  }
}

export default connect(mapStateToProps)(Navigation)
