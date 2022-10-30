import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSelector } from 'react-redux'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { setAdmin } from '../services/user-service'

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
						<ListGroup.Item>Puhelinnumero: {userDetails.user.phone}</ListGroup.Item>
						<ListGroup.Item>
							{userDetails && ( // NOT FOR FINAL PRODUCT
								<BootstrapSwitchButton
									checked={userDetails.user.admin != 0}
									onlabel='Admin'
									offlabel='Ei admin'
									width={120}
									onChange={(checked: boolean) => {
										setAdmin(userDetails.user.username, checked)
									}}
								/>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
		</div>
	)
}

export default UserPage
