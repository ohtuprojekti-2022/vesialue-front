/* istanbul ignore file */
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Alert, Button, Container, ListGroup, Modal } from 'react-bootstrap'
import { Polygon } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { selectAreasByReportId } from '../../redux/reducers/areaReducer'
import { updateEditedInventories } from '../../redux/reducers/editedInventoryReducer'
import { selectInventoryById } from '../../redux/reducers/inventoryReducer'
import { requestEdit } from '../../services/inventory-service'
import {
	formatDate,
	getCenter,
	translateMethod,
	translateVisibility,
} from '../../utils/tools'
import Map from '../map/Map'
import { RenderLongText } from '../RenderLongText'
import EditInventoryForm from './EditInventoryForm'

const EditInventory = () => {
	let { id } = useParams()
	const [report, areas, userId] = useSelector((state) => {
		return [
			selectInventoryById(state, id),
			selectAreasByReportId(state, id),
			state.userDetails.id,
		]
	})
	const dispatch = useDispatch()
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

	if (!report.user || report.user.id !== userId)
		<Navigate to={`/raportti/${report.id}`} />

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

			dispatch(updateEditedInventories(result))

			navigate(`/raportti/${report.id}`)
		} catch (error) {
			addAlert(error.toString())
		}
	}

	return (
		<Container fluid="sm" style={{ marginBottom: '1rem' }}>
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
						editReason={editReason}
						setEditReason={setEditReason}
					/>
					<Button
						title="Muokkaa alueita"
						variant="outline-primary"
						onClick={() => setPage('map')}
					>
						Edellinen
					</Button>
					<Button
						variant="secondary"
						onClick={() => navigate(-1)}
						style={{ marginLeft: '1rem' }}
					>
						Peruuta
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
						{/*areas &&
							areas.map((a) => (
								<Polygon
									key={a.id}
									positions={a.coordinates.map((c) => [c.lat, c.lng])}
								/>
							))*/}
					</Map>
					<ListGroup>
						<ListGroup.Item>
							<b>Päivämäärä:</b> {formatDate(inventorydate)}
						</ListGroup.Item>
						<ListGroup.Item>
							<b>Tapa:</b> {translateMethod(method, methodInfo)}
						</ListGroup.Item>
						{(method === 'dive' || method === 'sight') && (
							<ListGroup.Item>
								<b>Näkyvyys:</b> {translateVisibility(visibility)}
							</ListGroup.Item>
						)}
						<ListGroup.Item>
							<b>Kuvaus:</b>{' '}
							<RenderLongText text={moreInfo} maxLength={300} />
						</ListGroup.Item>
					</ListGroup>
					<br />
					<b>Muokkauksen syy:</b> {editReason}
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
