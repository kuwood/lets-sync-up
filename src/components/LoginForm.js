import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap'
import * as accountActions from '../actions/accountActions'

export class LoginForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let usr = ReactDOM.findDOMNode(this.username)
    let pw = ReactDOM.findDOMNode(this.password)
    let data = {
      username: usr.value,
      password: pw.value
    }
    this.props.dispatch(accountActions.requestLogin(data))
    usr.value = ""
    pw.value = ""
  }

  render() {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="formUsername">
          <Col sm={12}>
            <FormControl ref={node => this.username = node} type="text" placeholder="Username" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col sm={12}>
            <FormControl ref={node => this.password = node} type="password" placeholder="Password" />
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
