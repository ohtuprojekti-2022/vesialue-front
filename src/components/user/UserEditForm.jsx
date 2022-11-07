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
					pattern='([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+'
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna kunnollinen sähköpostiosoite!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="phone" className="mb-3">
				<Form.Control
					type="text"
					defaultValue={props.userDetails.user.phone}
					onChange={(e) => props.setPhone(e.target.value)}
					pattern="^((04[0-9]{1})(\s?|-?)|050(\s?|-?)|0457(\s?|-?)|[+]?358(\s?|-?)50|0358(\s?|-?)50|00358(\s?|-?)50|[+]?358(\s?|-?)4[0-9]{1}|0358(\s?|-?)4[0-9]{1}|00358(\s?|-?)4[0-9]{1})(\s?|-?)(([0-9]{3,4})(\s|-)?[0-9]{1,4})$"
				/>
				<Form.Control.Feedback type="invalid">
					Anna suomalainen puhelinnumero!
				</Form.Control.Feedback>
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
