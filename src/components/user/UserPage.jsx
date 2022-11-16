import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
/* import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { setAdmin } from '../services/user-service' */
import { useLocation } from 'react-router-dom'
import InventoryList from './../inventory/InventoryList'
import { resetFilter, updateFilter } from '../../redux/reducers/filterReducer'
import UserEditForm from './UserEditForm'
import { userEditRequest } from '../../services/user-service'
import { Container, Alert } from 'react-bootstrap'
import { login } from '../../redux/reducers/userReducer'


const UserInfo = ({ userDetails, dispatch }) => {
	const [name, setName] = useState(userDetails.user.name)
	const [email, setEmail] = useState(userDetails.user.email)
	const [phone, setPhone] = useState(userDetails.user.phone)
	const [showModal, setShowModal] = useState(false)
	const [validated, setValidated] = useState(false)
	const [alert, setAlert] = useState(null)

	const addAlert = (text) => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const handleSubmit = async (event) => {
		if (showModal == false) {
			const form = event.target
			const valid = form.checkValidity()
			setValidated(true)
			event.preventDefault()
			if (valid) {
				try {
					const data = await userEditRequest(name, email, phone, userDetails.user.username)
					dispatch(login(data))
					
					setValidated(false)
				} catch (error) {
					if (error.response.data.message === 'invalid') {
						addAlert('Käyttäjänimi varattu')
					} else {
						addAlert(error.response.data.message)
					}
				}
			}
		}
	}

	return (
		<Container fluid="sm">
			{alert && <Alert variant="danger">{alert}</Alert>}
			<UserEditForm
				userDetails={userDetails}
				validated={validated}
				handleSubmit={handleSubmit}
				setName={setName}
				setEmail={setEmail}
				setPhone={setPhone}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</Container>
	)
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
							<Nav.Link href="#tiedot" data-testid="user-info">Käyttäjätiedot</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="#inventoinnit" data-testid="own-inventories">Omat inventoinnit</Nav.Link>
						</Nav.Item>
					</Nav>
				</Card.Header>
				<Card.Body>
					{activeKey === '#tiedot' && (
						<UserInfo userDetails={userDetails} dispatch={dispatch}/>
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
