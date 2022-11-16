import React from 'react'
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

const InventoryReport = () => {
	let { id } = useParams()
	const [allInventories, allAreas, userDetails] = useSelector(({ inventories, areas, userDetails }) => {
		return [inventories, areas, userDetails]
	})
	const navigate = useNavigate()

	const report = allInventories.filter(i => i.id === id)[0]
	const areas = allAreas.filter(a => a.inventoryId === report.id)
	const center = getCenter(
		areas.reduce((prev, current) => {
			return [...prev, getCenter(current.coordinates)]
		}, [])
	)

	return (
		<div className="d-flex justify-content-around">
			<Card style={{ width: '40rem' }} data-testid="report-card">
				<Card.Body>
					<Card.Title >
						Raportti{' '}
						{report.user && userDetails && userDetails.user.id === report.user.id && (
							<Button onClick={() => navigate(`/report/${report.id}/edit`)}>
								Muokkaa
							</Button>
						)}
					</Card.Title>
					<Map center={center} >
						{areas.map(area => (
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
						<ListGroup.Item>Lisätietoja: {report.moreInfo}</ListGroup.Item>
						<ListGroup.Item>Tekijä: {parseCreator(report)}</ListGroup.Item>
						{(parseEmail(report) !== '') && (
							<ListGroup.Item>
								Sähköposti: {parseEmail(report)}
							</ListGroup.Item>
						)}
						{(parsePhone(report) !== '') && (
							<ListGroup.Item>
								Puhelinnumero: {parsePhone(report)}
							</ListGroup.Item>
						)}
					</ListGroup>
				</Card.Body>
			</Card>
		</div>
	)
}

export default InventoryReport
