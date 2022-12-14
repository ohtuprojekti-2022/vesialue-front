import React, { useState } from 'react'
import { Form, FloatingLabel, Button, Spinner } from 'react-bootstrap'
import TermsofserviceModal from '../TermsofserviceModal'
import PrivacyPolicyModal from '../PrivacyPolicyModal'
import { autosizeTextarea } from '../../utils/tools'
import {
	AREA_ERROR,
	ATTACHMENT_ERROR,
	DATE_ERROR,
	DESCRIPTION_ERROR,
	EMAIL_ERROR,
	METHOD_ERROR,
	NAME_ERROR,
	PHONE_ERROR,
} from '../../utils/error_messages.js'

/**
 * Renders the form in which the user can enter details about their inventory report and handles the inputs
 */
const InventoryForm = props => {
	const handleMethodChange = e => {
		props.setMethod(e.target.value)
		e.target.value === 'sight' || e.target.value === 'dive'
			? props.setVisibility('bad')
			: props.setVisibility('')
		if (e.target.value !== 'other') props.setMethodInfo('')
	}
	const [checked, setChecked] = useState('')
	const [showTOS, setShowTOS] = useState(false)
	const [showPP, setShowPP] = useState(false)

	return (
		<>
			<Form
				noValidate
				validated={props.validated}
				onSubmit={props.handleSubmit}
				data-testid="inventory-form"
			>
				<FloatingLabel controlId="coordinates" className="mb-3">
					<Form.Control
						data-testid="coordinates"
						type="text"
						defaultValue={props.mapLayers}
						hidden
						required
					/>
					<Form.Control.Feedback type="invalid">
						{AREA_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel
					controlId="inventorydate"
					label="Inventoinnin päivämäärä"
					className="mb-3"
				>
					<Form.Control
						data-testid="inventorydate"
						type="date"
						max={new Date().toISOString().split('T')[0]}
						onChange={e => {
							props.setInventorydate(e.target.value)
						}}
						required
					/>
					<Form.Control.Feedback type="invalid">
						{DATE_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				<div key="method" className="mb-3">
					<Form.Check
						data-testid="sight"
						inline
						label="Näköhavainto"
						name="method"
						type="radio"
						id="sight"
						onChange={handleMethodChange}
						value="sight"
						required
					/>
					<Form.Check
						data-testid="echo"
						inline
						label="Viistokaiutus"
						name="method"
						type="radio"
						id="echo"
						onChange={handleMethodChange}
						value="echo"
						required
					/>
					<Form.Check
						data-testid="dive"
						inline
						label="Sukellus"
						name="method"
						type="radio"
						id="dive"
						onChange={handleMethodChange}
						value="dive"
						required
					/>
					<Form.Check
						data-testid="other"
						inline
						label="Muu, mikä?"
						name="method"
						type="radio"
						id="other"
						onChange={handleMethodChange}
						value="other"
						required
					/>
				</div>
				{(props.method === 'sight' || props.method === 'dive') && (
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Näkyvyys vedessä</Form.Label>
						<Form.Select
							data-testid="visibility"
							onChange={e => props.setVisibility(e.target.value)}
							aria-label="Default select example"
						>
							<option value="bad">huono (alle 2m)</option>
							<option value="normal">normaali (2-5m)</option>
							<option value="good">hyvä (yli 5m)</option>
						</Form.Select>
					</Form.Group>
				)}
				{props.method === 'other' && (
					<FloatingLabel
						controlId="methodInfo"
						label="Muu, mikä?"
						className="mb-3"
					>
						<Form.Control
							data-testid="methodInfo"
							type="text"
							maxLength="100"
							onChange={e => props.setMethodInfo(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							{METHOD_ERROR}
						</Form.Control.Feedback>
					</FloatingLabel>
				)}
				{localStorage.getItem('userDetails') && (
					<Form.Group controlId="attachments" className="mb-3">
						<Form.Check
							data-testid="attachments"
							type="checkbox"
							label="Minulla on liitetiedosto(ja)"
							onClick={() => props.setAttachments(!props.attachments)}
						/>
						{props.attachments && (
							<>
								<Form.Text>
									Voit lisätä max. 5 liitetiedostoa. Liitetiedostojen
									maksimikoko on 64 megatavua. Liitetiedostot ovat tarkoitettu
									viistokaiutusdatalle ja valokuville.
									<br />
									Jos sinulla on isoja liitetiedostoja ja enemmän aineistoa
									sukelluksesta, kerro siitä raportissasi!
								</Form.Text>
								<Form.Control
									type="file"
									multiple
									required
									data-testid="attachment"
									onChange={event => {
										// Check if there are more than 5 attachments
										if (event.target.files.length > 5) {
											event.target.value = null
											props.setAttachmentFiles(null)
											alert(
												'Raporttiin voi lisätä enintään viisi liitetiedostoa!'
											)
										}
										// Go through the attachment files. Discard attachment if over 64 MB
										for (let i = 0; i < event.target.files.length; i++) {
											if (event.target.files[i].size > 67108864) {
												event.target.value = null
												props.setAttachmentFiles(null)
												alert('Liitetiedoston maksimikoko on 64 megatavua!')
											}
										}
										props.setAttachmentFiles(event.target.files)
									}}
								/>
								<Form.Control.Feedback type="invalid">
									{ATTACHMENT_ERROR}
								</Form.Control.Feedback>
							</>
						)}
					</Form.Group>
				)}
				<FloatingLabel
					style={{ paddingTop: '2rem' }}
					controlId="moreInfo"
					label="Kuvaus"
					className="mb-3"
				>
					<Form.Control
						data-testid="moreInfo"
						as="textarea"
						maxLength="5000"
						style={{ maxHeight: '12rem' }}
						onChange={e => {
							props.setMoreInfo(e.target.value)
							autosizeTextarea(e.target)
						}}
						required
					/>
					<Form.Control.Feedback type="invalid">
						{DESCRIPTION_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel controlId="name" label="Nimi" className="mb-3">
					{(localStorage.getItem('userDetails') && (
						<Form.Control
							data-testid="name"
							type="text"
							defaultValue={
								JSON.parse(localStorage.getItem('userDetails')).user.name
							}
							disabled
						/>
					)) || (
						<Form.Control
							data-testid="name"
							type="text"
							maxLength="100"
							onChange={e => props.setName(e.target.value)}
						/>
					)}
					<Form.Control.Feedback type="invalid">
						{NAME_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel controlId="email" label="Sähköposti" className="mb-3">
					{(localStorage.getItem('userDetails') && (
						<Form.Control
							data-testid="email"
							type="text"
							defaultValue={
								JSON.parse(localStorage.getItem('userDetails')).user.email
							}
							disabled
						/>
					)) || (
						<Form.Control
							data-testid="email"
							type="email"
							onChange={e => props.setEmail(e.target.value)}
							pattern="([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+"
							maxLength="100"
							required
						/>
					)}
					<Form.Control.Feedback type="invalid">
						{EMAIL_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel
					controlId="phonenumber"
					label="Puhelinnumero"
					className="mb-3"
				>
					{(localStorage.getItem('userDetails') && (
						<Form.Control
							data-testid="phone"
							type="text"
							defaultValue={
								JSON.parse(localStorage.getItem('userDetails')).user.phone
							}
							disabled
						/>
					)) || (
						<Form.Control
							data-testid="phone"
							type="phone"
							onChange={e => props.setPhone(e.target.value)}
							pattern="^\+?(?:[0-9][ |-]?){6,14}[0-9]$"
						/>
					)}
					<Form.Control.Feedback type="invalid">
						{PHONE_ERROR}
					</Form.Control.Feedback>
				</FloatingLabel>
				{(!localStorage.getItem('userDetails') && (
					<>
						<Form.Group
							controlId="terms-of-services"
							className="mb-3"
							style={{ display: 'inline-flex' }}
						>
							<Form.Check
								data-testid="terms-of-services"
								type="checkbox"
								checked={checked}
								onChange={() => setChecked(!checked)}
							/>
							<span style={{ paddingLeft: '10px' }}>
								Hyväksyn{' '}
								<span style={{ cursor: 'pointer' }}>
									<a
										className="text-primary"
										data-testid="pp"
										href="https://www.mas.fi/fi/tietosuojaseloste"
										target="_blank"
										rel="noopener noreferrer"
									>
										tietosuojaselosteen
									</a>
								</span>
								.
							</span>
						</Form.Group>
						{(props.submitted && (
							<Button variant="primary" disabled style={{ display: 'block' }}>
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>{' '}
								Lähetetään...
							</Button>
						)) || (
							<Button
								variant="primary"
								type="submit"
								data-testid="submit"
								disabled={!checked}
								style={{ display: 'block' }}
							>
								Lähetä
							</Button>
						)}
					</>
				)) || (
					<>
						{(props.submitted && (
							<Button variant="primary" disabled style={{ display: 'block' }}>
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>{' '}
								Lähetetään...
							</Button>
						)) || (
							<Button
								variant="primary"
								type="submit"
								data-testid="submit"
								style={{ display: 'block' }}
							>
								Lähetä
							</Button>
						)}
					</>
				)}
			</Form>
			<TermsofserviceModal show={showTOS} close={() => setShowTOS(false)} />
			<PrivacyPolicyModal show={showPP} close={() => setShowPP(false)} />
		</>
	)
}

export default InventoryForm
