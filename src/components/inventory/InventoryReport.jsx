import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Map from '../map/Map'
import Area from '../map/Area'
import {
	formatDate,
	getCenter,
	parseEmail,
	parsePhone,
	parseCreator,
	translateMethod,
	translateVisibility,
} from '../../utils/tools'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { selectInventoryById, removeAttachmentById, addAttachments } from '../../redux/reducers/inventoryReducer'
import { selectAreasByReportId } from '../../redux/reducers/areaReducer'
import AdminDeleteModal from './AdminDeleteModal'
import { selectDeletedInventoryByInventory } from '../../redux/reducers/deletedInventoryReducer'
import DeleteRequestView from './DeleteRequestView'
import { selectEditedInventoryByOriginalId } from '../../redux/reducers/editedInventoryReducer'
import EditRequestView from './EditRequestView'
import REACT_APP_BACKEND_URL from '../../utils/config'
import RenderLongText  from '../RenderLongText'
import {deleteAttachment, uploadAttachment} from '../../services/attachment-service'
import AttachmentUpload from './AttachmentUpload'

const InventoryReport = () => {
	let { id } = useParams()
	const dispatch = useDispatch()
	const [showAdminModal, setShowAdminModal] = useState(false)
	const [attachmentFiles, setAttachmentFiles] = useState(null)
	const [validated, setValidated] = useState(false)
	const [report, areas, userDetails, deleteRequest, editRequest] = useSelector(state => {
		return [
			selectInventoryById(state, id),
			selectAreasByReportId(state, id),
			state.userDetails,
			selectDeletedInventoryByInventory(state, id),
			selectEditedInventoryByOriginalId(state, id)
		]
	})
	const navigate = useNavigate()

	if (!report || !areas) {
		return <p>ladataan raporttia...</p>
	}

	const center = getCenter(
		areas.reduce((prev, current) => {
			return [...prev, getCenter(current.coordinates)]
		}, [])
	)

	const handleAttachmentUpload = async (event) => {
		const form = event.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()

		try {
			if (valid) {
				if ((report.attachment_files.length + attachmentFiles.length) > 5) {
					alert('Voit lisätä raporttiin enintään 5 liitetiedostoa!')
					setValidated(false)
					setAttachmentFiles(null)
					event.target.reset()
					return
				}

				const formData = new FormData()
				for (let i = 0; i < attachmentFiles.length; i++) {
					formData.append('file', attachmentFiles[i])
				}
				formData.append('inventory', report.id)
				try {
					const attachmentReferences = await uploadAttachment(formData)
					// Update attachment file references to the new inventory
					dispatch(addAttachments({
						inventoryId: report.id,
						newAttachments: attachmentReferences
					}))
				} catch(error) {
					console.log(error)
				}
			}
		} catch (error) {
			alert(error.toString())
		}

		// Clear upload form
		event.target.reset()

	}

	return (
		<div className="d-flex justify-content-around">

			<Card
				style={{ width: '40rem', marginBottom: '1rem' }}
				data-testid="report-card"
			>
				<Card.Body>
					<Card.Title>
						{userDetails && deleteRequest && (
							<DeleteRequestView
								deleteRequest={deleteRequest}
								isAdmin={userDetails.user.admin > 0}
							/>
						)}
						{userDetails &&
							editRequest && (
							<EditRequestView
								editRequest={editRequest}
								isAdmin={userDetails.user.admin > 0} />
						)}
						Raportti{' '}
						{report.user &&
							userDetails &&
							userDetails.user.id === report.user.id && (
							<Button onClick={() => navigate(`/raportti/${report.id}/muokkaa`)}>
									Muokkaa
							</Button>
						)}{' '}
						{report.user &&
							userDetails &&
							userDetails.user.id === report.user.id &&
							userDetails.user.admin < 1 && !deleteRequest && (
							<Button
								variant="danger"
								onClick={() => navigate(`/raportti/${report.id}/poista`)}
							>
									Pyydä poistoa
							</Button>
						)}
						{userDetails && userDetails.user.admin > 0 && !deleteRequest && (
							<Button
								variant="danger"
								onClick={() => setShowAdminModal(true)}
							>
								Poista
							</Button>
						)}
					</Card.Title>
					<Map center={center} autoZoom={true} >
						{areas.map((area) => (
							<Area key={area.id} coordinates={area.coordinates} />
						))}
					</Map>
					<ListGroup>
						<ListGroup.Item>
							<div className="fw-bold">Päivämäärä</div>
							{formatDate(report.inventorydate)}
						</ListGroup.Item>
						<ListGroup.Item>
							<div className="fw-bold">Tapa</div>
							{translateMethod(report.method, report.methodInfo)}
						</ListGroup.Item>
						{(report.method === 'dive' || report.method === 'sight') && (
							<ListGroup.Item>
								<div className="fw-bold">Näkyvyys</div>
								{translateVisibility(report.visibility)}
							</ListGroup.Item>
						)}
						<ListGroup.Item>
							<div className="fw-bold">Kuvaus</div>
							<RenderLongText text={report.moreInfo} maxLength={300} />
						</ListGroup.Item>
						<ListGroup.Item>
							<div className="fw-bold">Tekijä</div>
							{parseCreator(report)}
						</ListGroup.Item>
						{parseEmail(report) !== '' && (
							<ListGroup.Item>
								<div className="fw-bold">Sähköposti</div>
								{parseEmail(report)}</ListGroup.Item>
						)}
						{parsePhone(report) !== '' && (
							<ListGroup.Item>
								<div className="fw-bold">Puhelinnumero</div>
								{parsePhone(report)}
							</ListGroup.Item>
						)}
					</ListGroup>
					{(report.attachments && report.attachment_files.length > 0) && (
						<div>
							<ListGroup>
								<div className="fw-bold">Liitteet</div>
								{report.attachment_files.map(file => (
									<ListGroup.Item key={file.filename}>
										{file.filename}
										<Button
											style={{ marginLeft: '1rem' }}
											size="sm"
											onClick={() => window.open(
												`${REACT_APP_BACKEND_URL}/api/files/${file.attachment}`,
												'_blank')
											}
										>
										Lataa
										</Button>
										{report.user &&
										userDetails &&
										userDetails.user.id === report.user.id && (
											<Button
												variant="danger"
												style={{ marginLeft: '1rem' }}
												size="sm"
												onClick={async () => {
													const removedId = await deleteAttachment(file.attachment)
													dispatch(removeAttachmentById({
														inventoryId: report.id,
														attachmentId: removedId.deleted
													}))
												}}
											>
										Poista
											</Button>
										)}
									</ListGroup.Item>
								))}
							</ListGroup>

						</div>
					)}
					{report.user &&
						userDetails &&
						userDetails.user.id === report.user.id && (
						<AttachmentUpload
							handleAttachmentUpload={handleAttachmentUpload}
							setAttachmentFiles={setAttachmentFiles}
							validated={validated}
						/>
					)}
				</Card.Body>
				<AdminDeleteModal
					show={showAdminModal}
					close={() => setShowAdminModal(false)}
					id={id}
				/>
			</Card>
		</div>
	)
}

export default InventoryReport
