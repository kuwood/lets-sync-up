import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { socket } from '../index'
import { Panel, Button, Form, FormControl } from 'react-bootstrap'

export class VideoSource extends Component {
  constructor(props) {
    super(props)
    this.grabVideo = this.grabVideo.bind(this)
  }

  grabVideo(e) {
    e.preventDefault()
    let url = ReactDOM.findDOMNode(this.videoUrl).value
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    let id = match&&match[7].length===11 ? match[7] : false
    if (id) socket.emit('videoId', id)
    else console.log('this id is broke', id);
  }


  render() {
    return (
      <Panel header="Enter the youtube url below:">
        <Form inline onSubmit={this.grabVideo}>
          <FormControl
            ref={input => {this.videoUrl = input}}
            type="text"
            placeholder="https://www.youtube.com/..."
          />
          {' '}
          <Button type="submit" >
            Submit
          </Button>
        </Form>
      </Panel>
    )
  }
}

export default VideoSource
