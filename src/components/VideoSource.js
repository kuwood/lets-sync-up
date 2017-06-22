import React, { Component } from 'react'
import { socket } from '../index'
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap'

export class VideoSource extends Component {
  constructor(props) {
    super(props)
    this.grabVideo = this.grabVideo.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.state = {url: ''}
  }

  grabVideo(e) {
    e.preventDefault()
    const {url} = this.state
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = match&&match[7].length===11 ? match[7] : false
    
    if (id) {
      socket.emit('videoId', {id: id, room: this.props.room.id})
      this.props.refs.sourceOverlay.handleHide()
    }
    else alert('this id is broke', id)
  }

  handleInput(e) {
    this.setState({url: e.target.value})
  }

  render() {
    return (
      <div className="vid-source">
        <Form inline onSubmit={this.grabVideo}>
          <FormGroup bsSize="small">
            <FormControl
              onChange={this.handleInput}
              ref={input => {this.videoUrl = input}}
              type="text"
              placeholder="https://www.youtube.com/..."
            />
            {' '}
            <Button style={{'margin-top': '5px'}} block type="submit" bsSize="small">
              Go!
            </Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default VideoSource
