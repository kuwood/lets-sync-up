import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, Button, ControlLabel, Modal } from 'react-bootstrap'
import * as authActions from '../actions/authActions'

export class SignUpForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.props.dispatch(authActions.signUpModal(!this.props.modal))
  }

  handleSubmit(e) {
    e.preventDefault()
    let alias = ReactDOM.findDOMNode(this.formAlias)
    let usr = ReactDOM.findDOMNode(this.formUsername)
    let pw = ReactDOM.findDOMNode(this.formPassword)
    let data = {
      username: usr.value,
      password: pw.value,
      alias: alias.value
    }
    this.props.dispatch(authActions.requestSignUp(data))
    usr.value = ""
    pw.value = ""
    alias.value = ""
    this.props.dispatch(authActions.signUpModal(false))
  }

  render() {
    return (
      <Modal show={this.props.modal} onHide={this.toggleModal}>
        <Modal.Header>
          <Modal.Title>Fill out the information below to create an account!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Alias</ControlLabel>
              <FormControl
                type="text"
                ref={alias => {this.formAlias = alias}}
                placeholder="Enter an alias"
              />
            </FormGroup>

            <FormGroup controlId="formControlsEmail">
              <ControlLabel>Email address</ControlLabel>
              <FormControl
                type="email"
                ref={email => {this.formUsername = email}}
                placeholder="Enter email"
              />
            </FormGroup>

            <FormGroup controlId="formControlsPassword">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                ref={pw => {this.formPassword = pw}}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.toggleModal}>Close</Button>
          <Button type="submit" bsStyle="custom" onClick={this.handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect()(SignUpForm)
