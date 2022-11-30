import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

const UserEditForm = props => {

	return (
		<Form
			noValidate
			validated={props.validated}
			onSubmit={props.handleSubmit}
			data-testid="useredit-form"
		>
			<FloatingLabel controlId="username" className="mb-3" label="Käyttäjänimi">
				<Form.Control
					data-testid="username"
					type="text"
					minLength="3"
					maxLength="32"
					defaultValue={props.userDetails.user.username}
					onChange={(e) => props.setUsername(e.target.value)}
					disabled={!props.edit}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna kelvollinen käyttäjänimi! Pituus 3-32 merkkiä
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="name" className="mb-3" label="Nimi">
				<Form.Control
					data-testid="name"
					type="text"
					maxLength="100"
					defaultValue={props.userDetails.user.name}
					onChange={(e) => props.setName(e.target.value)}
					disabled={!props.edit}
				/>
				<Form.Control.Feedback type="invalid">
					Nimen maksimipituus on 100 merkkiä!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="email" className="mb-3" label="Sähköposti">
				<Form.Control
					data-testid="email"
					type="email"
					defaultValue={props.userDetails.user.email}
					onChange={(e) => props.setEmail(e.target.value)}
					pattern="([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+"
					maxLength="100"
					disabled={!props.edit}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Sähköpostiosoitteen tulee olla muotoa esimerkki@domain.com!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="phone" className="mb-3" label="Puhelinnumero">
				<Form.Control
					data-testid="phone"
					type="text"
					defaultValue={props.userDetails.user.phone}
					onChange={(e) => props.setPhone(e.target.value)}
					pattern="^\+?(?:[0-9][ |-]?){6,14}[0-9]$"
					disabled={!props.edit}
				/>
				<Form.Control.Feedback type="invalid">
					Puhelinnumerossa voi olla vain plus-merkki, välilyöntejä ja 7-15 numeroa!
				</Form.Control.Feedback>
			</FloatingLabel>
			{props.edit && (
				<Button variant="primary" type="submit">
					Tallenna
				</Button>
			)}
		</Form>
	)
}

export default UserEditForm
