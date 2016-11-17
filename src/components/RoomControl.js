import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { Glyphicon, Modal, Button, Form, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap'
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
      <div id="users-control">
        {aliasModal}
        <OverlayTrigger placement="top" overlay={<Tooltip>Click to change alias</Tooltip>}>
          <a onClick={this.toggleAlias}><h3 className="user-alias inline-block">{this.props.alias}</h3><Glyphicon glyph="edit" /></a>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Current room id</Tooltip>}>
          <p>{this.props.roomId}</p>
        </OverlayTrigger>
        <h1><small>User list</small></h1>
        <ul className="user-ul">
          {this.props.users.map((user, index) => {
            if (this.props.isOwner) {
              if (user.isOwner) {
                return (<li key={index} className="user-li">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Is the Owner</Tooltip>}><Glyphicon glyph="king" /></OverlayTrigger>
                    <span className="user-list-alias">{user.alias}</span>
                  </li>
                )
              } else if (user.isReady) {
                return (<li key={index} className="user-li">
                  <OverlayTrigger placement="top" overlay={<Tooltip>Is ready</Tooltip>}><Glyphicon glyph="thumbs-up" /></OverlayTrigger>
                  <span className="user-list-alias">{user.alias}</span>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Kick user</Tooltip>}><a className="kick"><Glyphicon glyph="remove" /></a></OverlayTrigger>
                  </li>
                )
              } else {
                return (<li key={index} className="user-li">
                  <OverlayTrigger placement="top" overlay={<Tooltip>Is not ready</Tooltip>}><Glyphicon glyph="thumbs-down" /></OverlayTrigger>
                  <span className="user-list-alias">{user.alias}</span>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Kick user</Tooltip>}><a className="kick"><Glyphicon glyph="remove" /></a></OverlayTrigger>
                  </li>
                )
              }
            } else {
              if (user.isOwner) {
                return (<li key={index} className="user-li">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Is the Owner</Tooltip>}><Glyphicon glyph="king" /></OverlayTrigger>
                    <span className="user-list-alias">{user.alias}</span>
                  </li>
                )
              } else if (user.isReady) {
                return (<li key={index} className="user-li">
                  <OverlayTrigger placement="top" overlay={<Tooltip>Is ready</Tooltip>}><Glyphicon glyph="thumbs-up" /></OverlayTrigger>
                  <span className="user-list-alias">{user.alias}</span>
                  </li>
                )
              } else {
                return (<li key={index} className="user-li">
                  <OverlayTrigger placement="top" overlay={<Tooltip>Is not ready</Tooltip>}><Glyphicon glyph="thumbs-down" /></OverlayTrigger>
                  <span className="user-list-alias">{user.alias}</span>
                  </li>
                )
              }
            }
          })}
        </ul>
      </div>
    )
  }
}

export default connect()(RoomControl)
