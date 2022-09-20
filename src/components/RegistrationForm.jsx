import React, { useState } from 'react'
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap'
import { registerNewUser } from '../services/user-service'

const RegistrationForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')
	const [validated, setValidated] = useState(false)

	const handleSubmit = async event => {
		event.preventDefault()
		const form = event.currentTarget

		if (form.checkValidity() === false) {
			// handle errors
		} else {
			setValidated(true)
			const data = await registerNewUser(username, password, email, phone, name)
			window.localStorage.setItem('auth', data.auth)

			setUsername('')
			setPassword('')
			setEmail('')
			setPhone('')
			setName('')
			setValidated(false)
		}
	}

	return (
		<Container fluid="sm">
			<h2>Luo uusi tunnus</h2>
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
						Käyttäjänimi ei voi olla tyhjä.
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
						Salasana ei voi olla tyhjä.
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
				<FloatingLabel controlId="phone" label="Puhelinnumero" className="mb-3">
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
		</Container>
	)
}

export default RegistrationForm
