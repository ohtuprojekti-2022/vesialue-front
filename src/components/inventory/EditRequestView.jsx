import Alert from 'react-bootstrap/Alert'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const EditRequestView = ({ editRequest }) => {
	const navigate = useNavigate()
	return(
		<Alert variant='primary'>
			<Alert.Heading>Tälle inventoinnille on tehty muokkauspyyntö</Alert.Heading>
			<hr />
			<Button
				onClick={() => navigate(`/muokatut/${editRequest.id}`)}>
                Tarkista pyyntö
			</Button>
		</Alert>
	)
}

export default EditRequestView