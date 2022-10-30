import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSelector } from 'react-redux'

const UserPage = () => {

	const userDetails = useSelector(({ userDetails }) => {
		return userDetails
	})

	return (
		<div className="d-flex justify-content-around">
			<Card style={{ width: '40rem' }}>
				<Card.Body>
					<Card.Title>{userDetails.user.username}</Card.Title>
					<ListGroup>
						<ListGroup.Item>Nimi: {userDetails.user.name}</ListGroup.Item>
						<ListGroup.Item>Sähköposti: {userDetails.user.email}</ListGroup.Item>
						<ListGroup.Item>Puhelinnumero: {userDetails.user.email}</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
		</div>
	)
}

export default UserPage
