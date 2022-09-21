import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import { registerNewUser } from '../services/user-service'

const RegistrationForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')
	const [validated, setValidated] = useState(false)
	const [alert, setAlert] = useState(null)
	const navigate = useNavigate()

	const addAlert = text => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const handleSubmit = async event => {
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
				window.localStorage.setItem('auth', data.auth)

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
		<Container fluid="sm">
			<h2>Luo uusi tunnus</h2>
			{alert && <Alert variant="danger">{alert}</Alert>}
			{localStorage.getItem('userDetails') && (
				<Alert variant="danger">
					Kirjaudu ulos luodaksesi uusi käyttäjätunnus!
				</Alert>
			)}
			{!localStorage.getItem('userDetails') && (
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<FloatingLabel
						controlId="username"
						label="Käyttäjänimi"
						className="mb-3"
					>
						<Form.Control
							type="text"
							placeholder="Käyttäjänimi"
							value={username}
							onChange={e => setUsername(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Anna vähintään 3 merkkiä pitkä käyttäjänimi!
						</Form.Control.Feedback>
					</FloatingLabel>
					<FloatingLabel controlId="email" label="Sähköposti" className="mb-3">
						<Form.Control
							type="email"
							placeholder="Sähköposti"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Anna validi sähköpostiosoite!
						</Form.Control.Feedback>
					</FloatingLabel>
					<FloatingLabel controlId="password" label="Salasana" className="mb-3">
						<Form.Control
							type="password"
							placeholder="Salasana"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Anna vähintään 10 merkkiä pitkä salasana!
						</Form.Control.Feedback>
					</FloatingLabel>
					<FloatingLabel
						controlId="name"
						label="Etu- ja sukunimi"
						className="mb-3"
					>
						<Form.Control
							type="text"
							placeholder="Etu- ja sukunimi"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</FloatingLabel>
					<FloatingLabel
						controlId="phone"
						label="Puhelinnumero"
						className="mb-3"
					>
						<Form.Control
							type="phone"
							placeholder="Puhelinnumero"
							value={phone}
							onChange={e => setPhone(e.target.value)}
						/>
					</FloatingLabel>
					<Button variant="primary" type="submit">
						Rekisteröidy
					</Button>
				</Form>
			)}
		</Container>
	)
}

export default RegistrationForm
