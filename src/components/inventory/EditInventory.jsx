/* istanbul ignore file */
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Alert, Button, Container, ListGroup, Modal } from 'react-bootstrap'
import { Polygon } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAreasByReportId } from '../../redux/reducers/areaReducer'
import { selectInventoryById } from '../../redux/reducers/inventoryReducer'
import { requestEdit } from '../../services/inventory-service'
import {
	formatDate,
	getCenter,
	translateMethod,
	translateVisibility,
} from '../../utils/tools'
import Map from '../map/Map'
import EditInventoryForm from './EditInventoryForm'

const EditInventory = () => {
	let { id } = useParams()
	const [report, areas] = useSelector((state) => {
		return [selectInventoryById(state, id), selectAreasByReportId(state, id)]
	})
	const center = getCenter(
		areas.reduce((prev, current) => {
			return [...prev, getCenter(current.coordinates)]
		}, [])
	)

	const [validated, setValidated] = useState(false)
	const [mapLayers, setMapLayers] = useState([])
	const [inventorydate, setInventorydate] = useState('')
	const [method, setMethod] = useState('')
	const [methodInfo, setMethodInfo] = useState('')
	const [visibility, setVisibility] = useState('')
	const [attachments, setAttachments] = useState(false)
	const [moreInfo, setMoreInfo] = useState('')
	const [editReason, setEditReason] = useState('')
	const navigate = useNavigate()
	const [alert, setAlert] = useState(null)
	const [page, setPage] = useState('map')

	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = (e) => {
		const form = e.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		e.preventDefault()
		if (valid) setShow(true)
	}

	useEffect(() => {
		if (report) {
			setInventorydate(report.inventorydate)
			setMethod(report.method)
			setMethodInfo(report.methodInfo)
			setVisibility(report.visibility)
			setAttachments(report.attachments)
			setMoreInfo(report.moreInfo)
		}
	}, [report])

	if (!report || !areas) {
		return <p>ladataan raporttia...</p>
	}

	const handleNext = () => {
		// Making sure the edits are saved
		const saveButton = document.querySelector('a[title="Save changes"]')
		if (saveButton) saveButton.click()
		setPage('form')
	}

	const addAlert = (text) => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const handleSubmit = async () => {
		try {
			const result = await requestEdit(
				mapLayers.map((layer) => layer.latlngs),
				inventorydate,
				method,
				methodInfo,
				visibility,
				attachments,
				moreInfo,
				editReason,
				report.id
			)

			console.log(result)

			navigate(`/report/${report.id}`)
		} catch (error) {
			addAlert(error.toString())
		}
	}

	return (
		<Container fluid="sm">
			<h2>Muokkaa raporttia</h2>
			{alert && <Alert variant="danger">{alert}</Alert>}
			{page === 'map' && (
				<>
					<Map
						setMapLayers={setMapLayers}
						editableAreas={areas}
						center={center}
					/>
					<div style={{ paddingTop: '0.5rem' }}>
						<Button title="Muokkaa tietoja" onClick={handleNext}>
							Seuraava
						</Button>
						<Button
							variant="secondary"
							onClick={() => navigate(-1)}
							style={{ marginLeft: '1rem' }}
						>
							Peruuta
						</Button>
					</div>
				</>
			)}
			{page === 'form' && (
				<>
					<EditInventoryForm
						validated={validated}
						handleSubmit={handleShow}
						inventorydate={inventorydate}
						setInventorydate={setInventorydate}
						method={method}
						setMethod={setMethod}
						methodInfo={methodInfo}
						setMethodInfo={setMethodInfo}
						visibility={visibility}
						setVisibility={setVisibility}
						attachments={attachments}
						setAttachments={setAttachments}
						moreInfo={moreInfo}
						setMoreInfo={setMoreInfo}
						setEditReason={setEditReason}
					/>
					<Button
						title="Muokkaa alueita"
						variant="outline-primary"
						onClick={() => setPage('map')}
					>
						Edellinen
					</Button>
				</>
			)}
			<Modal show={show} onHide={handleClose} style={{ zIndex: 2001 }}>
				<Modal.Header closeButton>
					<Modal.Title>Vahvista muokkauspyyntö</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Map center={center}>
						<Polygon positions={mapLayers.map((layer) => layer.latlngs)} />
					</Map>
					<ListGroup>
						<ListGroup.Item>
							Päivämäärä: {formatDate(inventorydate)}
						</ListGroup.Item>
						<ListGroup.Item>
							Tapa: {translateMethod(method, methodInfo)}
						</ListGroup.Item>
						{(method === 'dive' || method === 'sight') && (
							<ListGroup.Item>
								Näkyvyys: {translateVisibility(visibility)}
							</ListGroup.Item>
						)}
						<ListGroup.Item>Lisätietoja: {moreInfo}</ListGroup.Item>
					</ListGroup>
					<br />
					Muokkauksen syy: {editReason}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Jatka muokkausta
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Lähetä
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	)
}

export default EditInventory
