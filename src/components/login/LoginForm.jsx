import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

/**
 * Renders the form in which the user can enter their credentials for logging in
 */
const LoginForm = ({ validated, handleSubmit, setUsername, setPassword }) => {
	return (
		<Form
			noValidate
			validated={validated}
			onSubmit={handleSubmit}
			style={{ marginBottom: '0.25rem' }}
			data-testid="login-form"
		>
			<FloatingLabel
				controlId="username"
				label="Käyttäjätunnus tai sähköposti"
				className="mb-3"
			>
				<Form.Control
					type="text"
					onChange={e => setUsername(e.target.value)}
					required
					data-testid="user-name"
				/>
				<Form.Control.Feedback type="invalid">
					Anna käyttäjätunnus tai sähköpostiosoite!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="password" label="Salasana" className="mb-3">
				<Form.Control
					type="password"
					onChange={e => setPassword(e.target.value)}
					required
					data-testid="pass-word"
				/>
				<Form.Control.Feedback type="invalid">
					Anna salasana!
				</Form.Control.Feedback>
			</FloatingLabel>
			<Button variant="primary" type="submit" data-testid="loginbutton">
				Kirjaudu
			</Button>
		</Form>
	)
}

export default LoginForm
