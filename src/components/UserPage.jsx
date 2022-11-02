import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Nav, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { setAdmin } from '../services/user-service'
import { getInventoriesByUserId } from '../redux/reducers/inventoryReducer'
import InventoryListItem from './inventory/InventoryListItem'

const UserDetails = () => {
	const userDetails = useSelector(({ userDetails }) => {
		return userDetails
	})
	return (
		<ListGroup>
			<ListGroup.Item>Käyttäjätunnus: {userDetails.user.username}</ListGroup.Item>
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
						onChange={(checked) => {
							setAdmin(userDetails.user.username, checked)
						}}
					/>
				)}
			</ListGroup.Item>
		</ListGroup>)
}

const OwnInventories = () => {
	const userDetails = useSelector(({ userDetails }) => {
		return userDetails
	})

	const areas = useSelector(({ areas }) => {
		return areas
	})

	const inventories = useSelector(state =>
		getInventoriesByUserId(state, userDetails.user.id))

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Inventoinnin päivämäärä</th>
					<th>Havainnon tyyppi</th>
					<th>Tekijä</th>
					<th>Kaupunki</th>
				</tr>
			</thead>
			<tbody>
				{areas.length > 0 &&
					inventories.map(report => (
						<InventoryListItem
							key={report.id}
							report={report}
						/>
					))}
			</tbody>
		</Table>
	)
}

const UserPage = () => {
	const [activeKey, setActiveKey] = useState('#tiedot')

	console.log(activeKey)
	return (
		<div className="d-flex justify-content-around">
			<Card style={{ width: '40rem' }}>
				<Card.Header>
					<Nav variant="pills" defaultActiveKey="#tiedot" onSelect={key => setActiveKey(key)}>
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
						<UserDetails />
					)}
					{activeKey === '#inventoinnit' && (
						<OwnInventories />
					)}
				</Card.Body>
			</Card>
		</div>
	)
}

export default UserPage
