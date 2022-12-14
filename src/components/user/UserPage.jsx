import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Button, Nav, Container, Alert } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetFilter, updateFilter } from '../../redux/reducers/filterReducer'
import { userEditRequest } from '../../services/user-service'
import { login } from '../../redux/reducers/userReducer'
import UserEditForm from './UserEditForm'
import PasswordEditModal from './PasswordEditModal'
import PaginatedList from './../PaginatedList'

/**
 * Renders information of the current logged in user
 */
const UserInfo = ({ userDetails, dispatch }) => {
	const [edit, setEdit] = useState(false)
	const [username, setUsername] = useState(userDetails.user.username)
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
		const form = event.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()
		if (valid) {
			try {
				const data = await userEditRequest(name, email, phone, username)
				dispatch(login(data))

				setEdit(false)
				setValidated(false)
			} catch (error) {
				if (error.response.data.message === 'Username already exists.') {
					addAlert('Käyttäjänimi varattu! Valitse uusi.')
				} else if (error.response.data.message === 'Email already exists.') {
					addAlert('Sähköpostiosoite on jo käytössä!')
				} else {
					addAlert(error.response.data.message)
				}
			}
		}
	}

	return (
		<Container fluid="sm">
			{alert && <Alert variant="danger">{alert}</Alert>}
			<UserEditForm
				edit={edit}
				userDetails={userDetails}
				validated={validated}
				handleSubmit={handleSubmit}
				setUsername={setUsername}
				setName={setName}
				setEmail={setEmail}
				setPhone={setPhone}
			/>
			{!edit && (
				<>
					<Button variant="primary" onClick={() => setEdit(true)}>
						Muokkaa
					</Button>
					<br />
				</>
			)}
			<Button
				variant="secondary"
				onClick={() => setShowModal(true)}
				style={{ marginTop: '0.5rem' }}
			>
				Vaihda salasana
			</Button>
			<PasswordEditModal show={showModal} close={() => setShowModal(false)} />
		</Container>
	)
}

/**
 * Renders the user page that contains the user's info and allows them to edit it
 */
const UserPage = () => {
	const userDetails = useSelector(({ userDetails }) => {
		return userDetails
	})
	const location = useLocation()
	const [activeKey, setActiveKey] = useState(
		location.hash ? location.hash : '#tiedot'
	)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(resetFilter())
		dispatch(updateFilter({ id: 'userId', value: userDetails.user.id }))
	}, [])

	return (
		<div
			className="d-flex justify-content-around"
			style={{ marginBottom: '1rem' }}
		>
			<Card style={{ width: '40rem' }}>
				<Card.Header>
					<Nav
						justify
						variant="pills"
						defaultActiveKey={location.hash}
						onSelect={(key) => setActiveKey(key)}
					>
						<Nav.Item>
							<Nav.Link href="#tiedot" data-testid="user-info">
								Käyttäjätiedot
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="#inventoinnit" data-testid="own-inventories">
								Omat inventoinnit
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Card.Header>
				<Card.Body>
					{activeKey === '#tiedot' && (
						<UserInfo userDetails={userDetails} dispatch={dispatch} />
					)}
					{activeKey === '#inventoinnit' && (
						<PaginatedList perPageNumber={10} columns={{ creator: false }} />
					)}
				</Card.Body>
			</Card>
		</div>
	)
}

export default UserPage
