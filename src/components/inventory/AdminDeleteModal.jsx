import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import AdminDeleteButton from './AdminDeleteButton'

const AdminDeleteModal = ({ show, close, id }) => {
	return (
		<div className="container" data-testid="admin-delete-modal">
			<Modal size="lg" show={show} onHide={close} style={{ zIndex: 2001 }}>
				<Modal.Header closeButton>
					<Modal.Title>Oletko varma että haluat poistaa tämän inventoinnin?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Inventointi poistetaan pysyvästi. 
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={close}>
						Älä poista
					</Button>
					<AdminDeleteButton id={id}/>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default AdminDeleteModal