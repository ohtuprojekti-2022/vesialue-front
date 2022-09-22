import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import { addInventory } from '../services/inventory-service'

const InventoryForm = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phonenumber, setPhonenumber] = useState('')
	const [coordinates, setCoordinates] = useState('')
	const [time, setTime] = useState('')
	const [attachments, setAttachments] = useState('')
	const [method, setMethod] = useState('')
	const [visibility, setVisibility] = useState('')
	const [methodInfo, setMethodInfo] = useState('')
	const [moreInfo, setOther] = useState('')
	const [validated, setValidated] = useState(false)
	const [alert, setAlert] = useState(null)
	const navigate = useNavigate()

	const addAlert = (text) => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const handleMethodChange = (e) => setMethod(e.target.value)

	const handleSubmit = async (event) => {
		const form = event.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()
		if (valid) {
			try {
				const data = await addInventory(
					coordinates,
					time,
					method,
					visibility,
					methodInfo,
					attachments,
					name,
					email,
					phonenumber,
					moreInfo
				)
				window.localStorage.setItem('auth', data.auth)

				setCoordinates('')
				setTime('')
				setMethod('')
				setAttachments('')
				setName('')
				setEmail('')
				setPhonenumber('')
				setOther('')
				setValidated(false)
				navigate('/')
			} catch (error) {
				if (error.response.data.message === 'username taken') {
					addAlert('Käyttäjänimi varattu! Valitse uusi.')
				} else {
					addAlert(error.response.data.message)
				}
			}
		}
	}

	return (
		<Container fluid="sm">
			<h2>Lisää sukellus</h2>
			{alert && <Alert variant="danger">{alert}</Alert>}
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<FloatingLabel
					controlId="coordinates"
					label="Koordinaatit"
					className="mb-3"
				>
					<Form.Control
						type="text"
						value={coordinates}
						onChange={(e) => setCoordinates(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Anna sukelluksen koordinaatit!
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel
					controlId="time"
					label="Inventoinnin päivämäärä"
					className="mb-3"
				>
					<Form.Control
						type="date"
						value={time}
						onChange={(e) => setTime(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Anna sukelluksen ajankohta!
					</Form.Control.Feedback>
				</FloatingLabel>
				<div key="method" className="mb-3">
					<Form.Check
						inline
						label="Näköhavainto"
						name="method"
						type="radio"
						id="sight"
						onChange={handleMethodChange}
						value="sight"
					/>
					<Form.Check
						inline
						label="Viistokaiutus"
						name="method"
						type="radio"
						id="echo"
						onChange={handleMethodChange}
						value="echo"
					/>
					<Form.Check
						inline
						label="Sukellus"
						name="method"
						type="radio"
						id="dive"
						onChange={handleMethodChange}
						value="dive"
					/>
					<Form.Check
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
							onChange={(e) => setVisibility(e.target.value)}
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
							type="text"
							value={methodInfo}
							onChange={(e) => setMethodInfo(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Anna sukelluksen koordinaatit!
						</Form.Control.Feedback>
					</FloatingLabel>
				)}
				<Form.Group controlId="attachments" className="mb-3">
					<Form.Check type="checkbox" label="Minulla on liitetiedosto(ja)" />
				</Form.Group>
				<FloatingLabel controlId="other" label="Muuta tietoa" className="mb-3">
					<Form.Control
						type="text"
						value={moreInfo}
						onChange={(e) => setOther(e.target.value)}
					/>
				</FloatingLabel>
				<FloatingLabel controlId="name" label="Nimi" className="mb-3">
					<Form.Control
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</FloatingLabel>
				<FloatingLabel controlId="email" label="Sähköposti" className="mb-3">
					<Form.Control
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FloatingLabel>
				<FloatingLabel
					controlId="phonenumber"
					label="Puhelinnumero"
					className="mb-3"
				>
					<Form.Control
						type="phone"
						value={phonenumber}
						onChange={(e) => setPhonenumber(e.target.value)}
					/>
				</FloatingLabel>
				<Button variant="primary" type="submit">
					Lähetä
				</Button>
			</Form>
		</Container>
	)
}

export default InventoryForm
