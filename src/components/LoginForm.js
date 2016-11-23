import React, { Component } from 'react'
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap'

export class LoginForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

  }

  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formUsername">
          <Col sm={12}>
            <FormControl type="text" placeholder="Username" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col sm={12}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={10}>
            <Button type="submit">
              Login
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default LoginForm
