import React, { useEffect, useRef } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { autosizeTextarea } from '../../utils/tools'

/*
{
	validated,
	handleSubmit,
	setInventorydate,
	setMethod,
	setMethodInfo,
	setVisibility,
	setAttachments,
	setMoreInfo,
}
*/
const EditInventoryForm = (props) => {
	const handleMethodChange = (e) => {
		props.setMethod(e.target.value)
		e.target.value === 'sight' || e.target.value === 'dive'
			? props.setVisibility(props.visibility ? props.visibility : 'bad')
			: props.setVisibility('')
		e.target.value === 'other'
			? props.setMethodInfo(props.methodInfo)
			: props.setMethodInfo('')
	}
	const moreInfoRef = useRef(null)

	useEffect(() => {
		const moreInfoField = moreInfoRef.current
		autosizeTextarea(moreInfoField)
	}, [])

	return (
		<Form
			style={{ marginTop: '1rem', marginBottom: '1rem' }}
			noValidate
			validated={props.validated}
			onSubmit={props.handleSubmit}
		>
			<FloatingLabel
				controlId="inventorydate"
				label="Inventoinnin päivämäärä"
				className="mb-3"
			>
				<Form.Control
					data-testid="inventorydate"
					type="date"
					value={props.inventorydate}
					onChange={(e) => props.setInventorydate(e.target.value)}
					max={new Date().toISOString().split('T')[0]}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna inventoinnin ajankohta!
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
					checked={props.method === 'sight'}
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
					checked={props.method === 'echo'}
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
					checked={props.method === 'dive'}
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
					checked={props.method === 'other'}
					required
				/>
			</div>
			{(props.method === 'sight' || props.method === 'dive') && (
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Näkyvyys vedessä</Form.Label>
					<Form.Select
						data-testid="visibility"
						onChange={(e) => props.setVisibility(e.target.value)}
						defaultValue={props.visibility}
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
						defaultValue={props.methodInfo}
						onChange={(e) => props.setMethodInfo(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Anna inventointimenetelmän tiedot!
					</Form.Control.Feedback>
				</FloatingLabel>
			)}
			<Form.Group controlId="attachments" className="mb-3">
				<Form.Check
					data-testid="attachments"
					type="checkbox"
					label="Minulla on liitetiedosto(ja)"
					onChange={() => props.setAttachments(!props.attachments)}
					checked={props.attachments}
				/>
			</Form.Group>
			<FloatingLabel controlId="moreInfo" label="Kuvaus" className="mb-3">
				<Form.Control
					ref={moreInfoRef}
					data-testid="moreInfo"
					as="textarea"
					maxLength="500"
					defaultValue={props.moreInfo}
					onChange={(e) => {
						props.setMoreInfo(e.target.value)
						autosizeTextarea(e.target)		
					}}
					required
				/>
				<Form.Control.Feedback type="invalid">
					{'Kirjoita kuvaus (max 500 merkkiä)'}
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel
				controlId="editReason"
				label="Muokkauksen syy"
				className="mb-3"
			>
				<Form.Control
					data-testid="editReason"
					as="textarea"
					maxLength="500"
					defaultValue={props.editReason}
					onChange={(e) => {
						props.setEditReason(e.target.value)
						autosizeTextarea(e.target)
					}}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Syy muokkaukselle vaaditaan {'(max 500 merkkiä)'}
				</Form.Control.Feedback>
			</FloatingLabel>
			<Button type="submit">Pyydä muokkausta</Button>
		</Form>
	)
}

export default EditInventoryForm
