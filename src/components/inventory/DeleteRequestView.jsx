import Alert from 'react-bootstrap/Alert'
import React, { useState } from 'react'
import RejectDeletionButton from './RejectDeletionButton'
import AdminDeleteModal from './AdminDeleteModal'
import { Button } from 'react-bootstrap'

const DeleteRequestView = ({ deleteRequest, isAdmin }) => {
	const [showAdminModal, setShowAdminModal] = useState(false)
	
	return (
		<>
			<Alert variant='warning'>
				<Alert.Heading>Tälle inventoinnille on tehty poistopyyntö</Alert.Heading>
				<hr />
				<p>
					Poiston syy: {deleteRequest.reason}
				</p>
				<RejectDeletionButton id={deleteRequest.id} />
				{isAdmin && <Button
					onClick={() => setShowAdminModal(true)}
					variant='danger'
					style={{ marginLeft: '0.5rem' }}
				>
					Hyväksy poistopyyntö
				</Button>}
			</Alert>
			<AdminDeleteModal
				show={showAdminModal}
				close={() => setShowAdminModal(false)}
				id={deleteRequest.inventory}
			/>
		</>

	)
}

export default DeleteRequestView