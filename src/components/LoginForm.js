import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap'
import * as authActions from '../actions/authActions'

export class LoginForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const userCreds = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.dispatch(authActions.requestLogin(userCreds))
  }

  handleInput  = (propertyName, event) => {
    const userCreds = this.state
    const newCreds = {
      ...userCreds,
      [propertyName]: event.target.value
    }
    this.setState(newCreds)
  }

  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formUsername">
          <Col sm={12}>
            <FormControl
              onChange={(event) => this.handleInput('username', event)}
              value={this.state.username}
              type="text"
              placeholder="Username" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col sm={12}>
            <FormControl
              onChange={(event) => this.handleInput('password', event)}
              value={this.state.password}
              type="password"
              placeholder="Password" />
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

export default connect()(LoginForm)
