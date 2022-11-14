import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const NotifyMessage = ({ show, handleClose, title, message }) => {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message}</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleClose}>
                    OK
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default NotifyMessage