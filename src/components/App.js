import React, { Component } from 'react'
import { connect } from 'react-redux'

import Navigation from './Navigation'

export class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-wrap">
          <Navigation />
          {this.props.children}
        </div>
        <footer>
          <a href="https://github.com/kuwood/lets-sync-up">View on github</a>
        </footer>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    video: state.video,
    user: state.user,
    room: state.room
  }
}

let Container = connect(mapStateToProps)(App)

export default Container
