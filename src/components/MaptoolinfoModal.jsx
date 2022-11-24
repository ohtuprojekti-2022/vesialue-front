/* istanbul ignore file */
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const MaptoolinfoModal = ({ show, close }) => {
	return (
		<div className="container" data-testid="maptoolinfo-modal">
			<Modal size="lg" show={show} onHide={close} style={{ zIndex: 2001 }}>
				<Modal.Header closeButton>
					<Modal.Title>Käyttöohje</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Käyttöohjeet
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={close}>
						Sulje
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default MaptoolinfoModal
