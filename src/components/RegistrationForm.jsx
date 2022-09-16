import React, { useState } from 'react'
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap'
import { registerNewUser } from '../services/user-service'

const RegistrationForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')

	const handleSubmit = async event => {
		event.preventDefault()
		registerNewUser(username, password, email, phone, name)
	}

	return (
		<Container fluid="sm">
			<Form onSubmit={handleSubmit}>
				<FloatingLabel
					controlId="name"
					label="Etu- ja sukunimi"
					className="mb-3"
				>
					<Form.Control
						type="text"
						placeholder="Etu- ja sukunimi"
						onChange={e => setName(e.target.value)}
					/>
				</FloatingLabel>
				<FloatingLabel controlId="email" label="Sähköposti" className="mb-3">
					<Form.Control
						type="email"
						placeholder="Sähköposti"
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</FloatingLabel>
				<FloatingLabel controlId="phone" label="Puhelinnumero" className="mb-3">
					<Form.Control
						type="phone"
						placeholder="Puhelinnumero"
						onChange={e => setPhone(e.target.value)}
					/>
				</FloatingLabel>
				<FloatingLabel
					controlId="username"
					label="Käyttäjänimi"
					className="mb-3"
				>
					<Form.Control
						type="text"
						placeholder="Käyttäjänimi"
						onChange={e => setUsername(e.target.value)}
						required
					/>
				</FloatingLabel>
				<FloatingLabel controlId="password" label="Salasana" className="mb-3">
					<Form.Control
						type="password"
						placeholder="Salasana"
						onChange={e => setPassword(e.target.value)}
						required
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
