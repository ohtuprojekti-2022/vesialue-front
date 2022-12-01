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
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { selectInventoryById } from '../../redux/reducers/inventoryReducer'
import { selectAreasByReportId } from '../../redux/reducers/areaReducer'
import AdminDeleteModal from './AdminDeleteModal'
import { selectDeletedInventoryByInventory } from '../../redux/reducers/deletedInventoryReducer'
import DeleteRequestView from './DeleteRequestView'
import { selectEditedInventoryByOriginalId } from '../../redux/reducers/editedInventoryReducer'
import EditRequestView from './EditRequestView'

const InventoryReport = () => {
	let { id } = useParams()
	const [showAdminModal, setShowAdminModal] = useState(false)
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
							<Button onClick={() => navigate(`/report/${report.id}/edit`)}>
									Muokkaa
							</Button>
						)}{' '}
						{report.user &&
							userDetails &&
							userDetails.user.id === report.user.id &&
							userDetails.user.admin < 1 && !deleteRequest && (
							<Button
								variant="danger"
								onClick={() => navigate(`/report/${report.id}/delete`)}
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
							Päivämäärä: {formatDate(report.inventorydate)}
						</ListGroup.Item>
						<ListGroup.Item>
							Tapa: {translateMethod(report.method, report.methodInfo)}
						</ListGroup.Item>
						{(report.method === 'dive' || report.method === 'sight') && (
							<ListGroup.Item>
								Näkyvyys: {translateVisibility(report.visibility)}
							</ListGroup.Item>
						)}
						<ListGroup.Item>Kuvaus: {report.moreInfo}</ListGroup.Item>
						<ListGroup.Item>Tekijä: {parseCreator(report)}</ListGroup.Item>
						{parseEmail(report) !== '' && (
							<ListGroup.Item>Sähköposti: {parseEmail(report)}</ListGroup.Item>
						)}
						{parsePhone(report) !== '' && (
							<ListGroup.Item>
								Puhelinnumero: {parsePhone(report)}
							</ListGroup.Item>
						)}
					</ListGroup>
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
