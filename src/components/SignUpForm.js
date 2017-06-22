import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, Button, ControlLabel, Modal } from 'react-bootstrap'
import * as authActions from '../actions/authActions'

export class SignUpForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.state = {
      username: '',
      password: '',
      alias: ''
    }
  }

  toggleModal() {
    this.props.dispatch(authActions.signUpModal(!this.props.modal))
  }

  handleSubmit(e) {
    e.preventDefault()
    const newUser = this.state
    this.props.dispatch(authActions.requestSignUp(newUser))
    this.setState({oassword: ''})
    this.props.dispatch(authActions.signUpModal(false))
  }

  handleInputs = propertyName => event => {
    const data = this.state
    this.setState({
      ...data,
      [propertyName]: event.target.value
    })
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
                onChange={this.handleInputs('alias')}
                placeholder="Enter an alias"
              />
            </FormGroup>

            <FormGroup controlId="formControlsEmail">
              <ControlLabel>Email address</ControlLabel>
              <FormControl
                type="email"
                onChange={this.handleInputs('username')}
                placeholder="Enter email"
              />
            </FormGroup>

            <FormGroup controlId="formControlsPassword">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                onChange={this.handleInputs('password')}
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
