/* istanbul ignore file */
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Alert, Button, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAreasByReportId } from '../../redux/reducers/areaReducer'
import { selectInventoryById } from '../../redux/reducers/inventoryReducer'
import { requestEdit } from '../../services/inventory-service'
import { getCenter } from '../../utils/tools'
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

	const addAlert = (text) => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const handleSubmit = async (event) => {
		const form = event.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()
		if (valid) {
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
						<Button title="Muokkaa tietoja" onClick={() => setPage('form')}>
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
						handleSubmit={handleSubmit}
						inventorydate={inventorydate}
						setInventorydate={setInventorydate}
						method={method}
						setMethod={setMethod}
						methodInfo={report.methodInfo}
						setMethodInfo={setMethodInfo}
						visibility={report.visibility}
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
		</Container>
	)
}

export default EditInventory
