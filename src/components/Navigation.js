import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const Navigation = (props) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Lets sync up</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#">Create a room</NavItem>
          <NavItem eventKey={2} href="#">Join a room</NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1}><Button bsStyle="primary" bsSize="xsmall">Sign up</Button></NavItem>
          <NavItem eventKey={2} href="#">Login</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
