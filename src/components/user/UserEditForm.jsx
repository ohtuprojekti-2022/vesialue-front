import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

const UserEditForm = props => {

	return (
		<Form noValidate validated={props.validated} onSubmit={props.handleSubmit}>
			<FloatingLabel controlId="username" className="mb-3">
				<Form.Control
					type="text"
					defaultValue={props.userDetails.user.username}
					disabled
				/>
			</FloatingLabel>
			<FloatingLabel controlId="name" className="mb-3">
				<Form.Control
					type="text"
					defaultValue={props.userDetails.user.name}
					onChange={(e) => props.setName(e.target.value)}
				/>
			</FloatingLabel>
			<FloatingLabel controlId="email" className="mb-3">
				<Form.Control
					type="email"
					defaultValue={props.userDetails.user.email}
					onChange={(e) => props.setEmail(e.target.value)}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna kunnollinen sähköposti!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="phone" className="mb-3">
				<Form.Control
					type="text"
					defaultValue={props.userDetails.user.phone}
					onChange={(e) => props.setPhone(e.target.value)}
				/>
			</FloatingLabel>
			<Button variant="primary" type="submit">
				Tallenna
			</Button>
			<Button variant="secondary" onClick={() => {}} style={{marginLeft: 20}}>
				Vaihda salasana
			</Button>
		</Form>
	)
}

export default UserEditForm
