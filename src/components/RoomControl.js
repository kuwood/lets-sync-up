import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { Glyphicon, Modal, Button, Form, FormControl } from 'react-bootstrap'
import { socket } from '../index'
import * as userActions from '../actions/userActions'

class RoomControl extends Component {
  constructor(props) {
    super(props)
    this.handleAlias = this.handleAlias.bind(this)
    this.toggleAlias = this.toggleAlias.bind(this)
    this.state = {showModal: false}
    socket.on('requestAlias', defaultAlias => {
      this.props.dispatch(userActions.alias(defaultAlias))
      this.setState({showModal: true})
    })
  }

  toggleAlias() {
    this.setState({showModal: !this.state.showModal})
  }

  handleAlias(e) {
    e.preventDefault()
    let newAlias = ReactDOM.findDOMNode(this.inputAlias).value
    let aliasData = {roomId: this.props.roomId, name: newAlias}
    this.props.dispatch(userActions.alias(newAlias))
    socket.emit('setAlias', aliasData)
    this.setState({showModal: this.state.false})
  }

  render () {
    let aliasModal = <Form>
    <Modal show={this.state.showModal} onHide={this.toggleAlias}>
      <Modal.Header>
        <Modal.Title>Set New Alias</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormControl ref={input => {this.inputAlias = input}} />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.toggleAlias}>Close</Button>
        <Button type="submit" bsStyle="primary" onClick={this.handleAlias}>Save changes</Button>
      </Modal.Footer>

    </Modal>
    </Form>
    return (
      // TODO: HANDLE USERS READY STATUS.
      <div id="users-control">
        {aliasModal}
        <a onClick={this.toggleAlias}><h4 className="inline-block">{this.props.alias}</h4><Glyphicon glyph="edit" /></a>
        <p>Room Id: {this.props.roomId}</p>
        <h1><small>User list</small></h1>
        <ul className="user-ul">
          <li className="user-li"><a>user</a></li>
          <li className="user-li"><a>user</a></li>
          <li className="user-li"><a>user</a></li>
          <li className="user-li"><a>user</a></li>
          <li className="user-li"><a>user</a></li>
          <li className="user-li"><a>user</a></li>
          <li className="user-li"><a>user</a></li>
          <li className="user-li"><a>user</a></li>
          <li className="user-li"><a>user</a></li>
          <li className="user-li"><a>user</a></li>
        </ul>
      </div>
    )
  }
}

export default connect()(RoomControl)
