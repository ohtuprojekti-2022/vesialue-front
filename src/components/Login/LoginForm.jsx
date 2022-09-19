import React, { useState } from 'react'
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap'
import { loginRequest } from '../../services/user-service'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async event => {
		event.preventDefault()
		loginRequest(username, password)
	}

	return (
		<Container fluid="sm">
			<Form onSubmit={handleSubmit}>
				<FloatingLabel
					controlId="username"
					label="Käyttäjätunnus"
					className="mb-3"
				>
					<Form.Control
						type="text"
						placeholder="Käyttäjätunnus"
						onChange={e => setUsername(e.target.value)}
						required
					/>
				</FloatingLabel>
				<FloatingLabel 
					controlId="password"
					label="Salasana"
					className="mb-3"
				>
					<Form.Control
						type="password"
						placeholder="Salasana"
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</FloatingLabel>
				<Button variant="primary" type="submit">
					Kirjaudu
				</Button>
			</Form>
		</Container>
	)

}

export default LoginForm
