import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import * as authActions from '../actions/authActions'


export class ProfileContainer extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('prof mounted');
    this.props.dispatch(authActions.requestProfile())
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={6}>
            <h3>Account: </h3>
            <p></p>
          </Col>
          <Col xs={12} md={6}>
            <h3>Alias:</h3>
            <p>{this.props.user.alias}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h3>Favorites: </h3>
          </Col>
        </Row>
      </Grid>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    video: state.video,
    user: state.user
  }
}

export default connect(mapStateToProps)(ProfileContainer)
