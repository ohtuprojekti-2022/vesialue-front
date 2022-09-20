import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import { loginRequest } from '../services/user-service'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [alert, setAlert] = useState(null)
	const navigate = useNavigate()

	const addAlert = text => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const handleSubmit = async event => {
		event.preventDefault()

		try {
			const data = await loginRequest(username, password)
			localStorage.setItem('userDetails', JSON.stringify(data))

			setUsername('')
			setPassword('')
			navigate('/')
		} catch (error) {
			if (error.response.data.message === 'incorrect username or password') {
				addAlert('Väärä käyttäjänimi tai salasana')
			} else {
				addAlert(error.response.data.message)
			}
		}
	}

	return (
		<Container fluid="sm">
			<h2>Kirjaudu sisään</h2>
			{alert && <Alert variant="danger">{alert}</Alert>}
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
				<FloatingLabel controlId="password" label="Salasana" className="mb-3">
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
