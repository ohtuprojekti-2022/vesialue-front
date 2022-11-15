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
					type="text"
					defaultValue={props.userDetails.user.username}
					disabled
				/>
			</FloatingLabel>
			<FloatingLabel controlId="name" className="mb-3" label="Nimi">
				<Form.Control
					data-testid="name"
					type="text"
					defaultValue={props.userDetails.user.name}
					onChange={e => props.setName(e.target.value)}
					pattern="^[a-zA-Z\s]*$"
				/>
				<Form.Control.Feedback type="invalid">
					Nimessä voi olla vain kirjaimia ja välilyöntejä!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="email" className="mb-3" label="Sähköposti">
				<Form.Control
					data-testid="email"
					type="email"
					defaultValue={props.userDetails.user.email}
					onChange={e => props.setEmail(e.target.value)}
					pattern="([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+"
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
					onChange={e => props.setPhone(e.target.value)}
					pattern="^\+?(?:[0-9][ |-]?){6,14}[0-9]$"
				/>
				<Form.Control.Feedback type="invalid">
					Puhelinnumerossa voi olla vain numeroita, välejä ja plus-merkki!
				</Form.Control.Feedback>
			</FloatingLabel>
			<Button variant="primary" type="submit">
				Tallenna
			</Button>
			<Button variant="secondary" onClick={() => {}} style={{ marginLeft: 20 }}>
				Vaihda salasana
			</Button>
		</Form>
	)
}

export default UserEditForm
