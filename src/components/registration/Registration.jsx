/* istanbul ignore file */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Alert } from 'react-bootstrap'
import { registerNewUser } from '../../services/user-service'
import RegistrationForm from './RegistrationForm'
import { login } from '../../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'

const Registration = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')
	const [validated, setValidated] = useState(false)
	const [alert, setAlert] = useState(null)
	const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('userDetails')))
	const navigate = useNavigate()

	const addAlert = (text) => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)

	}

	useEffect(() => {
		setLoggedIn(Boolean(localStorage.getItem('userDetails')))
	}, [])

	const handleSubmit = async (event) => {
		const form = event.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()
		if (valid) {
			try {
				const data = await registerNewUser(
					username,
					password,
					email,
					phone,
					name
				)
				dispatch(login(data))

				setUsername('')
				setPassword('')
				setEmail('')
				setPhone('')
				setName('')
				setValidated(false)
				navigate('/')
			} catch (error) {
				if (error.response.data.message === 'Username already exists.') {
					addAlert('Käyttäjänimi varattu! Valitse uusi.')
				} else if (error.response.data.message === 'Password too short.') {
					addAlert('Salasanassa pitää olla vähintään 10 merkkiä!')
				} else if (error.response.data.message === 'Username too short.') {
					addAlert('Käyttäjänimessä pitää olla vähintään 3 merkkiä!')
				} else if (error.response.data.message === 'Invalid email.') {
					addAlert('Anna validi sähköpostiosoite!')
				} else if (error.response.data.message === 'Email already exists.') {
					addAlert('Sähköpostiosoite on jo käytössä!')
				} else if (error.response.data.message === 'Password too long.') {
					addAlert('Salasanassa voi olla enintään 100 merkkiä!')
				} else {
					addAlert(error.response.data.message)
				}
			}
		}
	}

	return (
		<Container fluid="sm">
			<h2>Luo uusi tunnus</h2>
			{alert && <Alert variant="danger">{alert}</Alert>}
			{loggedIn && (
				<Alert variant="danger">
					Kirjaudu ulos luodaksesi uusi käyttäjätunnus!
				</Alert>
			)}
			{!localStorage.getItem('userDetails') && (
				<RegistrationForm
					validated={validated}
					handleSubmit={handleSubmit}
					setUsername={setUsername}
					setPassword={setPassword}
					setEmail={setEmail}
					setPhone={setPhone}
					setName={setName}
				/>
			)}
		</Container>
	)
}

export default Registration
