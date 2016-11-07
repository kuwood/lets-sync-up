import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

const Jumbo = (props) => {
  return (
    <Jumbotron>
      <h1>Experience Youtube together.</h1>
      <p>Let's sync up lets you syncronize playback of youtube videos between users in a room.</p>
      <p>To get started use the "Create a room" link above!</p>
      <Button>Hide</Button>
    </Jumbotron>
  )
}

export default Jumbo
