import Alert from 'react-bootstrap/Alert'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const EditRequestView = ({ editRequest, isAdmin }) => {
	const navigate = useNavigate()
	return (
		<Alert variant='primary' data-testid='edit-request-alert'>
			<Alert.Heading>{
				isAdmin && 'Tälle inventoinnille on tehty muokkauspyyntö'
				|| 'Olet jättänyt tälle inventoinnille muokkauspyynnön'
			}
			</Alert.Heading>
			<hr />
			<Button
				onClick={() => navigate(`/muokatut/${editRequest.id}`)}>
				Tarkista pyyntö
			</Button>
		</Alert>
	)
}

export default EditRequestView