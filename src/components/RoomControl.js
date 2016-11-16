import React, { Component } from 'react'
import { Glyphicon  } from 'react-bootstrap'
class RoomControl extends Component {
  render () {
    return (
      // TODO: HANDLE USERS READY STATUS.
      <div id="users-control">
        <a><h4 className="inline-block">{this.props.alias}</h4><Glyphicon glyph="edit" /></a>
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

export default RoomControl
