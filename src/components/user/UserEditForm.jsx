import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import {EMAIL_ERROR, NAME_ERROR, PHONE_ERROR, USERNAME_ERROR} from '../../utils/error_messages.js'

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
					{USERNAME_ERROR}
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="name" label="Etu- ja sukunimi" className="mb-3">
				<Form.Control
					data-testid="name"
					type="text"
					maxLength="60"
					defaultValue={props.userDetails.user.name}
					onChange={(e) => props.setName(e.target.value)}
					disabled={!props.edit}
				/>
				<Form.Control.Feedback type="invalid">
					{NAME_ERROR}
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="email" className="mb-3" label="Sähköposti">
				<Form.Control
					data-testid="email"
					type="email"
					defaultValue={props.userDetails.user.email}
					onChange={(e) => props.setEmail(e.target.value)}
					pattern="([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+"
					disabled={!props.edit}
					required
				/>
				<Form.Control.Feedback type="invalid">
					{EMAIL_ERROR}
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
					{PHONE_ERROR}
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
