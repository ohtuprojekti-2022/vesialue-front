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
	const [methods, setMethods] = useState('')
	const [other, setOther] = useState('')
	const [validated, setValidated] = useState(false)
	const [alert, setAlert] = useState(null)
	const navigate = useNavigate()

	const addAlert = text => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const handleSubmit = async event => {
		const form = event.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()
		if (valid) {
			try {
				const data = await addInventory(
					coordinates,
					time,
					methods,
					attachments,
					name,
					email,
					phonenumber,
					other
				)
				window.localStorage.setItem('auth', data.auth)

				setCoordinates('')
				setTime('')
				setMethods('')
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
				<FloatingLabel controlId="coordinates" label="Koordinaatit" className="mb-3">
					<Form.Control
						type="text"
						value={coordinates}
						onChange={e => setCoordinates(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Anna sukelluksen koordinaatit!
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel controlId="time" label="Aika" className="mb-3">
					<Form.Control
						type="datetime-local"
						value={time}
						onChange={e => setTime(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Anna sukelluksen ajankohta!
					</Form.Control.Feedback>
				</FloatingLabel>
				<Form.Group controlId="methods" className="mb-3">
					{['checkbox'].map((type) => (
						<div key={`inline-${type}`} className="mb-3">
							<Form.Check
								inline
								label="ensimmäinen menetelmä"
								name="group1"
								type={type}
								id={`inline-${type}-1`}
							/>
							<Form.Check
								inline
								label="toinen menetelmä"
								type={type}
								id={`inline-${type}-2`}
							/>
							<Form.Check
								inline
								label="kolmas menetelmä"
								type={type}
								id={`inline-${type}-3`}
							/>
							<Form.Check
								inline
								label="Muu, kerro lisätiedoissa"
								type={type}
								id={`inline-${type}-4`}
							/>
						</div>
					))}
					<Form.Control.Feedback type="invalid">
						Anna menetelmä!
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId="attachments" className="mb-3">
					<Form.Check type="checkbox" label="Lisää liitetiedosto" />
				</Form.Group>
				<FloatingLabel controlId="other" label="Muuta tietoa" className="mb-3">
					<Form.Control
						type="text"
						value={other}
						onChange={e => setOther(e.target.value)}
					/>
				</FloatingLabel>
				<FloatingLabel controlId="name" label="Nimi" className="mb-3">
					<Form.Control
						type="text"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</FloatingLabel>
				<FloatingLabel controlId="email" label="Sähköposti" className="mb-3">
					<Form.Control
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</FloatingLabel>
				<FloatingLabel controlId="phonenumber" label="Puhelinnumero" className="mb-3">
					<Form.Control
						type="phone"
						value={phonenumber}
						onChange={e => setPhonenumber(e.target.value)}
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
