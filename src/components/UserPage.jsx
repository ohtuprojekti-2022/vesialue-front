import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
/* import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { setAdmin } from '../services/user-service' */
import { useLocation } from 'react-router-dom'
import InventoryList from './inventory/InventoryList'
import { resetFilter, updateFilter } from '../redux/reducers/filterReducer'

const UserInfo = ({ userDetails }) => {
	return (
		<ListGroup>
			<ListGroup.Item>Käyttäjätunnus: {userDetails.user.username}</ListGroup.Item>
			<ListGroup.Item>Nimi: {userDetails.user.name}</ListGroup.Item>
			<ListGroup.Item>Sähköposti: {userDetails.user.email}</ListGroup.Item>
			<ListGroup.Item>Puhelinnumero: {userDetails.user.phone}</ListGroup.Item>
			{/* 			<ListGroup.Item>
				{userDetails && ( // NOT FOR FINAL PRODUCT
					<BootstrapSwitchButton
						checked={userDetails.user.admin != 0}
						onlabel='Admin'
						offlabel='Ei admin'
						width={120}
						onChange={(checked) => {
							setAdmin(userDetails.user.username, checked)
						}}
					/>
				)}
			</ListGroup.Item> */}
		</ListGroup>)
}

const UserPage = () => {
	const userDetails = useSelector(({ userDetails }) => {
		return userDetails
	})
	const location = useLocation()
	const [activeKey, setActiveKey] = useState(location.hash)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(resetFilter())
		dispatch(updateFilter({ id: 'creator', value: userDetails.user.username }))
	}, [])

	return (
		<div className="d-flex justify-content-around">
			<Card style={{ width: '40rem' }}>
				<Card.Header>
					<Nav justify variant="pills" defaultActiveKey={location.hash} onSelect={key => setActiveKey(key)}>
						<Nav.Item>
							<Nav.Link href="#tiedot">Käyttäjätiedot</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="#inventoinnit">Omat inventoinnit</Nav.Link>
						</Nav.Item>
					</Nav>
				</Card.Header>
				<Card.Body>
					{activeKey === '#tiedot' && (
						<UserInfo userDetails={userDetails} />
					)}
					{activeKey === '#inventoinnit' && (
						<InventoryList columns={{ creator: false }} />
					)}
				</Card.Body>
			</Card>
		</div>
	)
}

export default UserPage
