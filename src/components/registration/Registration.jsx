import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Alert } from 'react-bootstrap'
import { registerNewUser } from '../../services/user-service'
import RegistrationForm from './RegistrationForm'

const Registration = ({ setUserDetails }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')
	const [validated, setValidated] = useState(false)
	const [alert, setAlert] = useState(null)
	const navigate = useNavigate()

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
				const data = await registerNewUser(
					username,
					password,
					email,
					phone,
					name
				)
				setUserDetails(data)
				localStorage.setItem('userDetails', JSON.stringify(data))

				setUsername('')
				setPassword('')
				setEmail('')
				setPhone('')
				setName('')
				setValidated(false)
				navigate('/')
			} catch (error) {
				if (error.response.data.message === 'username taken') {
					addAlert('Käyttäjänimi varattu! Valitse uusi.')
				} else {
					addAlert(error.response.data.message)
				}
			}
		}
	}

	return (
		<Container fluid="sm" data-testid="registration-form">
			<h2>Luo uusi tunnus</h2>
			{alert && <Alert variant="danger">{alert}</Alert>}
			{localStorage.getItem('userDetails') && (
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
