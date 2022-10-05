import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import { addInventory } from '../services/inventory-service'
import Map from './Map'
import '../static/inventoryform.css'

const InventoryForm = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [inventorydate, setInventorydate] = useState('')
	const [attachments, setAttachments] = useState(false)
	const [method, setMethod] = useState('')
	const [visibility, setVisibility] = useState('')
	const [methodInfo, setMethodInfo] = useState('')
	const [moreInfo, setMoreInfo] = useState('')
	const [validated, setValidated] = useState(false)
	const [alert, setAlert] = useState(null)
	const [mapLayers, setMapLayers] = useState([])
	const navigate = useNavigate()

	const addAlert = text => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const handleMethodChange = e => setMethod(e.target.value)

	const handleSubmit = async event => {
		const form = event.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()
		if (valid) {
			try {
				await addInventory(
					mapLayers.map(layer => layer.latlngs),
					inventorydate,
					method,
					visibility,
					methodInfo,
					attachments,
					name,
					email,
					phone,
					moreInfo
				)

				setInventorydate('')
				setMethod('')
				setAttachments('')
				setName('')
				setEmail('')
				setPhone('')
				setMoreInfo('')
				setValidated(false)
				navigate('/')
			} catch (error) {
				addAlert(error.toString())
			}
		}
	}

	return (
		<Container fluid="sm" data-testid="inventory-form">
			<h2>Lisää inventointi</h2>
			{alert && <Alert variant="danger">{alert}</Alert>}
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Map setMapLayers={setMapLayers} />
				<FloatingLabel controlId="coordinates" className="mb-3">
					<Form.Control
						data-testid="coordinates"
						type="text"
						value={JSON.stringify(mapLayers).slice(1, -1)}
						onChange={e => setMapLayers(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Anna inventointialue!
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel
					controlId="inventorydate"
					label="Inventoinnin päivämäärä"
					className="mb-3"
				>
					<Form.Control
						data-testid="date"
						type="date"
						value={inventorydate}
						onChange={e => setInventorydate(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Anna sukelluksen ajankohta!
					</Form.Control.Feedback>
				</FloatingLabel>
				<div key="method" className="mb-3">
					<Form.Check
						data-testid="method"
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
					/>
				</div>
				{(method === 'sight' || method === 'dive') && (
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Näkyvyys vedessä</Form.Label>
						<Form.Select
							data-testid="visibility"
							onChange={e => setVisibility(e.target.value)}
							aria-label="Default select example"
						>
							<option value="bad">huono (alle 2m)</option>
							<option value="normal">normaali (2-5m)</option>
							<option value="good">hyvä (yli 5m)</option>
						</Form.Select>
					</Form.Group>
				)}
				{method === 'other' && (
					<FloatingLabel
						controlId="methodInfo"
						label="Muu, mikä?"
						className="mb-3"
					>
						<Form.Control
							data-testid="other_info"
							type="text"
							value={methodInfo}
							onChange={e => setMethodInfo(e.target.value)}
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
						onClick={() => setAttachments(!attachments)}
					/>
				</Form.Group>
				<FloatingLabel
					controlId="more_info"
					label="Muuta tietoa"
					className="mb-3"
				>
					<Form.Control
						data-testid="more_info"
						type="text"
						value={moreInfo}
						onChange={e => setMoreInfo(e.target.value)}
					/>
				</FloatingLabel>
				<FloatingLabel controlId="name" label="Nimi" className="mb-3">
					<Form.Control
						data-testid="name"
						type="text"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</FloatingLabel>
				<FloatingLabel controlId="email" label="Sähköposti" className="mb-3">
					<Form.Control
						data-testid="email"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Anna sähköposti!
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel
					controlId="phonenumber"
					label="Puhelinnumero"
					className="mb-3"
				>
					<Form.Control
						data-testid="phone"
						type="phone"
						value={phone}
						onChange={e => setPhone(e.target.value)}
					/>
				</FloatingLabel>
				<Button variant="primary" type="submit" data-testid="submit">
					Lähetä
				</Button>
			</Form>
		</Container>
	)
}

export default InventoryForm
