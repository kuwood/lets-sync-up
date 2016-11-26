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
import * as userActions from '../actions/userActions'
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
  }

  componentDidMount() {
    this.props.dispatch(authActions.checkAuth())
    // server emits from createRoom event
    socket.on('roomRedirect', roomId => {
      browserHistory.push(`/room/${roomId}`);
      this.props.dispatch(roomActions.roomId(roomId));
      console.log(this.props.room.id, 'from redirect');
      socket.emit('joinRoom', roomId)
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
      console.log('alias requested', this.props.room.id, 'is current id');
      console.log('auth status is', this.props.auth.isAuthenticated);
      console.log('alias is', this.props.alias);
      if (this.props.auth.isAuthenticated) {
        let aliasData = {roomId: this.props.room.id, name: this.props.alias}
        socket.emit('setAlias', aliasData)
      } else {
        this.props.dispatch(userActions.alias(defaultAlias))
        this.props.dispatch(userActions.aliasModal(true))
        // TODO: maybe store modal state in redux store to control request
        // this.setState({showModal: true})
        // let aliasData = {roomId: this.props.room.id, name: defaultAlias}
      }
    })
  }

  createRoom() {
    if (this.props.room.id) socket.emit('leaveRoom', this.props.room.id)
    this.props.dispatch(roomActions.roomId(null))
    socket.emit('createRoom')
  }

  joinRoom(e) {
    e.preventDefault()
    if (this.props.room.id) socket.emit('leaveRoom', this.props.room.id)
    this.props.dispatch(roomActions.roomId(null))
    this.props.dispatch(videoActions.setVideo(null))

    let room = ReactDOM.findDOMNode(this.roomId).value
    let data = {
      roomId: room,
      name: this.props.alias
    }
    browserHistory.push(`/room/${room}`);
    this.props.dispatch(roomActions.roomId(room))
    socket.emit('joinRoom', room)
    if (this.props.auth.isAuthenticated) {
      console.log('alias is', this.props.alias);
      let data = {
        roomId: room,
        name: this.props.alias
      }
      console.log('set alias from Navigation');
      socket.emit('setAlias', data)
    }
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
            <SignUpForm modal={this.props.auth.signUpModal} />
            {!this.props.auth.isAuthenticated ? (
              <NavItem eventKey={1}><Button onClick={this.showModal} bsStyle="primary" bsSize="xsmall">Sign up</Button></NavItem>
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
