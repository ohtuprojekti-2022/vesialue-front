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
					type="text"
					minLength="3"
					maxLength="32"
					placeholder="Käyttäjänimi"
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna kelvollinen käyttäjänimi! Pituus 3-32 merkkiä
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="email" label="Sähköposti" className="mb-3">
				<Form.Control
					type="email"
					placeholder="Sähköposti"
					onChange={(e) => setEmail(e.target.value)}
					pattern='([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+'
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna kelvollinen sähköpostiosoite!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="password" label="Salasana" className="mb-3">
				<Form.Control
					type="password"
					minLength="10"
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
					type="text"
					placeholder="Etu- ja sukunimi"
					onChange={(e) => setName(e.target.value)}
				/>
			</FloatingLabel>
			<FloatingLabel controlId="phone" label="Puhelinnumero" className="mb-3">
				<Form.Control
					type="phone"
					placeholder="Puhelinnumero"
					onChange={(e) => setPhone(e.target.value)}
					pattern="^\+?(?:[0-9][ |-]?){6,14}[0-9]$"
				/>
				<Form.Control.Feedback type="invalid">
					Anna kelvollinen puhelinnumero!
				</Form.Control.Feedback>
			</FloatingLabel>
			<Button variant="primary" type="submit" data-testid="submit">
				Rekisteröidy
			</Button>
		</Form>
	)
}

export default RegistrationForm
