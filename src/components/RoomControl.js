import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Glyphicon, Modal, Button, Form, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { socket } from '../index'
import ListUser from './ListUser'
import * as userActions from '../actions/userActions'

class RoomControl extends Component {
  constructor(props) {
    super(props)
    this.handleAlias = this.handleAlias.bind(this)
    this.toggleAlias = this.toggleAlias.bind(this)
    this.handleAliasInput = this.handleAliasInput.bind(this)
    this.state = {name: this.props.alias}
  }

  handleKick(user) {
    user.room = this.props.roomId
    socket.emit('kickUser', user)
  }

  // toggles alias change modal
  toggleAlias() {
    this.props.dispatch(userActions.aliasModal(!this.props.modal))
  }

  // handles setting new alias from modal
  handleAlias(e) {
    e.preventDefault()
    const newAlias = this.state.name
    const aliasData = {roomId: this.props.roomId, name: newAlias}
    this.props.dispatch(userActions.alias(newAlias))
    socket.emit('setAlias', aliasData)
    this.props.dispatch(userActions.aliasModal(false))
  }

  handleAliasInput(e) {
    this.setState({name: e.target.value})
  }

  render () {
    const aliasModal = <Form>
      <Modal show={this.props.modal} onHide={this.toggleAlias}>
        <Modal.Header>
          <Modal.Title>Set New Alias</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormControl onChange={this.handleAliasInput}
            value={this.state.name}
            placeholder={this.props.alias} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.toggleAlias}>Close</Button>
          <Button type="submit" bsStyle="custom" onClick={this.handleAlias}>Save changes</Button>
        </Modal.Footer>

      </Modal>
    </Form>

    return (
      <div id="users-control">
        {aliasModal}
        <OverlayTrigger placement="top" overlay={<Tooltip id="change-alias">Click to change alias</Tooltip>}>
          <a onClick={this.toggleAlias}><h3 className="user-alias inline-block">{this.props.alias}</h3><Glyphicon glyph="edit" /></a>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip id="current-room">Current room id</Tooltip>}>
          <p>{this.props.roomId}</p>
        </OverlayTrigger>
        <h1><small>User list</small></h1>
        <ul className="user-ul">
          {this.props.users.map((user, index) => {
            if (this.props.isOwner) {
              if (user.isOwner) {
                return <ListUser key={index} tooltip='Is the Owner' glyph='king' alias={user.alias} />
              } else if (user.isReady) {
                return <ListUser key={index} tooltip='Is ready' glyph='thumbs-up' alias={user.alias} kickUser={() => this.handleKick(user)} />
              } else {
                return <ListUser key={index} tooltip='Is not ready' glyph='thumbs-down' alias={user.alias} kickUser={() => this.handleKick(user)} />
              }
            } else {
              if (user.isOwner) {
                return <ListUser key={index} tooltip='Is the Owner' glyph='king' alias={user.alias} />
              } else if (user.isReady) {
                return <ListUser key={index} tooltip='Is ready' glyph='thumbs-up' alias={user.alias} />
              } else {
                return <ListUser key={index} tooltip='Is not ready' glyph='thumbs-down' alias={user.alias} />
              }
            }
          })}
        </ul>
      </div>
    )
  }
}

export default connect()(RoomControl)
