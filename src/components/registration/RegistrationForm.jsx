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
					Anna 3-32 merkkiä pitkä käyttäjänimi!
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
					Anna validi sähköpostiosoite!
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
					pattern="^((04[0-9]{1})(\s?|-?)|050(\s?|-?)|0457(\s?|-?)|[+]?358(\s?|-?)50|0358(\s?|-?)50|00358(\s?|-?)50|[+]?358(\s?|-?)4[0-9]{1}|0358(\s?|-?)4[0-9]{1}|00358(\s?|-?)4[0-9]{1})(\s?|-?)(([0-9]{3,4})(\s|-)?[0-9]{1,4})$"
				/>
				<Form.Control.Feedback type="invalid">
					Anna validi suomalainen puhelinnumero!
				</Form.Control.Feedback>
			</FloatingLabel>
			<Button variant="primary" type="submit" data-testid="submit">
				Rekisteröidy
			</Button>
		</Form>
	)
}

export default RegistrationForm
