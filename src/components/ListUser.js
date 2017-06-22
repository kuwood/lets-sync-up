import React from 'react'
import { OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap'

export const ListUser = (props) => (
  <li key={props.index} className="user-li">
    <OverlayTrigger placement="top" overlay={
      <Tooltip id={`tooltip-status-${props.index}`}>{props.tooltip}</Tooltip>}>
        <Glyphicon glyph={props.glyph} />
    </OverlayTrigger>
    <span className="user-list-alias">{props.alias}</span>
    {props.kickUser && <OverlayTrigger placement="top" overlay={
      <Tooltip id={`tooltip-kick-${props.index}`}>Kick user</Tooltip>}>
        <a className="kick" onClick={props.kickUser}>
          <Glyphicon glyph="remove" /></a>
    </OverlayTrigger>}
  </li>
)

export default ListUser