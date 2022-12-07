import React, { useState } from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import TermsofserviceModal from '../TermsofserviceModal'
import PrivacyPolicyModal from '../PrivacyPolicyModal'
import {EMAIL_ERROR, NAME_ERROR, PASSWORD_ERROR, PHONE_ERROR, USERNAME_ERROR} from '../../utils/error_messages.js'

const RegistrationForm = ({
	validated,
	handleSubmit,
	setUsername,
	setEmail,
	setPassword,
	setName,
	setPhone,
}) => {

	const [checked, setChecked] = useState('')
	const [showTOS, setShowTOS] = useState(false)
	const [showPP, setShowPP] = useState(false)

	return (
		<>
			<Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="registration-form">
				<FloatingLabel controlId="username" label="Käyttäjänimi" className="mb-3">
					<Form.Control
						type="text"
						minLength="3"
						maxLength="32"
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						{USERNAME_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel controlId="email" label="Sähköposti" className="mb-3">
					<Form.Control
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						pattern="([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+"
						maxLength="100"
						required
					/>
					<Form.Control.Feedback type="invalid">
						{EMAIL_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel controlId="password" label="Salasana" className="mb-3">
					<Form.Control
						type="password"
						minLength="10"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						{PASSWORD_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel controlId="name" label="Etu- ja sukunimi" className="mb-3">
					<Form.Control
						data-testid="name"
						type="text"
						maxLength="60"
						onChange={(e) => setName(e.target.value)}
					/>
					<Form.Control.Feedback type="invalid">
						{NAME_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel controlId="phone" label="Puhelinnumero" className="mb-3">
					<Form.Control
						type="phone"
						onChange={(e) => setPhone(e.target.value)}
						pattern="^\+?(?:[0-9][ |-]?){6,14}[0-9]$"
					/>
					<Form.Control.Feedback type="invalid">
						{PHONE_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				<Form.Group controlId="terms-of-services" className="mb-3" style={{display: 'inline-flex'}}>
					<Form.Check
						data-testid="terms-of-services"
						type="checkbox"
						checked={checked}
						onChange={() => setChecked(!checked)}
					/>
					<span style={{paddingLeft: '10px'}}>
						Hyväksyn <span style={{cursor: 'pointer'}}>
							<a className="text-primary" data-testid="tos" onClick={() => setShowTOS(true)} >käyttöehdot</a> ja <a className="text-primary" data-testid="pp" href="https://www.mas.fi/fi/tietosuojaseloste" target="_blank" rel="noopener noreferrer">tietosuojaselosteen</a></span>.
					</span>
				</Form.Group>
				<Button variant="primary"
					type="submit"
					data-testid="submit"
					className="mb-5"
					disabled={!checked}
					style={{display: 'block'}}>
					Rekisteröidy
				</Button>
			</Form>
			<TermsofserviceModal
				show={showTOS}
				close={() => setShowTOS(false)}
			/>
			<PrivacyPolicyModal
				show={showPP}
				close={() => setShowPP(false)}
			/>
		</>
	)
}

export default RegistrationForm
