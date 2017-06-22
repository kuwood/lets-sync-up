import React from 'react'

export const Directions = () => (
  <div className="directions-wrap">
    <div>
      <div className="directions-heading">
        <h3>Dont bother doing a "count down".</h3>
        <p className="directions-text">Simplify YouTube Synchronization in three easy steps.</p>
      </div>
    </div>
    <div className="directions-container">
      <div className="directions-block">
        <p className="directions-title">Create a room.</p>
        <p className="directions-text">Use the create a room button to get started with a generated room i.d. or click join room to create
          one with a custom name.
        </p>
      </div>
      <div className="directions-block">
        <p className="directions-title">Get a youtube URL.</p>
        <p className="directions-text">Find a youtube video to share with the room, grab the url and use the "Set input video" button to set the
          video for the room.
        </p>
      </div>
      <div className="directions-block">
        <p className="directions-title">Enjoy the video.</p>
        <p className="directions-text">Once you have set the video, you will need to wait until all users in the room have flagged
          themselves as "ready". Once everyone is ready you can hit play!
        </p>
      </div>
    </div>
  </div>
)

export default Directions