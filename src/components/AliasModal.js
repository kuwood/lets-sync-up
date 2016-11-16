import React from 'react'
import { Modal, Button  } from 'react-bootstrap'

const AliasModal = (props) => {
  return (
    <Modal show={this.props.show}>
      <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        One fine body...
      </Modal.Body>

      <Modal.Footer>
        <Button>Close</Button>
        <Button bsStyle="primary">Save changes</Button>
      </Modal.Footer>

    </Modal>
  )
};

export default AliasModal
