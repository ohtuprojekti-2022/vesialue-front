import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

const RegistrationForm = ({
	validated,
	handleSubmit,
	setUsername,
	setEmail,
	setPassword,
	setName,
	setPhone,
}) => {
	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="registration-form">
			<FloatingLabel controlId="username" label="Käyttäjänimi" className="mb-3">
				<Form.Control
					data-testid="username"
					type="text"
					placeholder="Käyttäjänimi"
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna vähintään 3 merkkiä pitkä käyttäjänimi!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="email" label="Sähköposti" className="mb-3">
				<Form.Control
					data-testid="email"
					type="email"
					placeholder="Sähköposti"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna validi sähköpostiosoite!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="password" label="Salasana" className="mb-3">
				<Form.Control
					data-testid="password"
					type="password"
					placeholder="Salasana"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna vähintään 10 merkkiä pitkä salasana!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="name" label="Etu- ja sukunimi" className="mb-3">
				<Form.Control
					data-testid="name"
					type="text"
					placeholder="Etu- ja sukunimi"
					onChange={(e) => setName(e.target.value)}
				/>
			</FloatingLabel>
			<FloatingLabel controlId="phone" label="Puhelinnumero" className="mb-3">
				<Form.Control
					data-testid="phone"
					type="phone"
					placeholder="Puhelinnumero"
					onChange={(e) => setPhone(e.target.value)}
				/>
			</FloatingLabel>
			<Button variant="primary" type="submit" data-testid="submit">
				Rekisteröidy
			</Button>
		</Form>
	)
}

export default RegistrationForm
