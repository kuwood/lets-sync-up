import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { socket } from '../index'
import { Panel, Button, Form, FormControl, FormGroup } from 'react-bootstrap'


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
    if (id) socket.emit('videoId', {id: id, room: this.props.room.id})
    else console.log('this id is broke', id)
  }


  render() {
    // <Panel header="Enter the youtube url below:">
    return (
      <div className="vid-source">
        <Form inline onSubmit={this.grabVideo}>
          <FormGroup bsSize="small">
            <FormControl
              ref={input => {this.videoUrl = input}}
              type="text"
              placeholder="https://www.youtube.com/..."
            />
            {' '}
            <Button type="submit" bsSize="small">
              Go!
            </Button>
          </FormGroup>

        </Form>
      </div>
    )
  }
}

export default VideoSource
