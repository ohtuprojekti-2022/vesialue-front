/* istanbul ignore file */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Alert } from 'react-bootstrap'
import { addInventory } from '../../services/inventory-service'
import InventoryForm from './InventoryForm'
import Map from '../Map'

const Inventory = () => {
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

	const handleSubmit = async event => {
		const form = event.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()
		localStorage.setItem('values', JSON.stringify({'name': name, 'email': email, 'phone': phone}))
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
		<Container fluid="sm">
			<h2>Lisää inventointi</h2>
			{alert && <Alert variant="danger">{alert}</Alert>}
			<Map setMapLayers={setMapLayers} />
			<InventoryForm
				validated={validated}
				handleSubmit={handleSubmit}
				mapLayers={mapLayers}
				setInventorydate={setInventorydate}
				method={method}
				setMethod={setMethod}
				setVisibility={setVisibility}
				setMethodInfo={setMethodInfo}
				attachments={attachments}
				setAttachments={setAttachments}
				setMoreInfo={setMoreInfo}
				setName={setName}
				setEmail={setEmail}
				setPhone={setPhone}
			/>
		</Container>
	)
}

export default Inventory
