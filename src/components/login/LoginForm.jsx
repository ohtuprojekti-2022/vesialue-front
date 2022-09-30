import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

const LoginForm = ({ validated, handleSubmit, setUsername, setPassword }) => {
	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<FloatingLabel
				controlId="username"
				label="Käyttäjätunnus"
				className="mb-3"
			>
				<Form.Control
					type="text"
					placeholder="Käyttäjätunnus"
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna käyttäjänimi!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="password" label="Salasana" className="mb-3">
				<Form.Control
					type="password"
					placeholder="Salasana"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna salasana!
				</Form.Control.Feedback>
			</FloatingLabel>
			<Button variant="primary" type="submit">
				Kirjaudu
			</Button>
		</Form>
	)
}

export default LoginForm
