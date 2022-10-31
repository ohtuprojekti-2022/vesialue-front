import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Placeholder from 'react-bootstrap/Placeholder'
import Map from '../map/Map'
import Area from '../map/Area'
import {
	formatDate,
	getCenter,
	translateMethod,
	translateVisibility,
} from '../../utils/tools'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const InventoryReport = () => {
	let { id } = useParams()
	const allInventories = useSelector(({ inventories }) => {
		return inventories
	})
	const allAreas = useSelector(({ areas }) => {
		return areas
	})
	const userDetails = useSelector(({ userDetails }) => {
		return userDetails
	})
	const navigate = useNavigate()

	if (allInventories.length === 0 || allAreas.length === 0) {
		return (
			<div className="d-flex justify-content-around">
				<Card style={{ width: '40rem' }}>
					<Card.Body>
						<Placeholder as={Card.Title} animation="glow">
							<Placeholder xs={6} />
						</Placeholder>
						<Placeholder as={Card.Title} animation="glow">
							<Placeholder xs={6} />
						</Placeholder>
						<Placeholder as={Card.Text} animation="glow">
							<Placeholder xs={7} /> <Placeholder xs={4} />{' '}
							<Placeholder xs={4} /> <Placeholder xs={6} />{' '}
							<Placeholder xs={8} />
						</Placeholder>
					</Card.Body>
				</Card>
			</div>
		)
	}
	const report = allInventories.filter(i => i.id === id)[0]
	const areas = allAreas.filter(a => a.inventoryId === report.id)
	const center = getCenter(
		areas.reduce((prev, current) => {
			return [...prev, getCenter(current.coordinates)]
		}, [])
	)
	return (
		<div className="d-flex justify-content-around">
			<Card style={{ width: '40rem' }}>
				<Card.Body>
					<Card.Title>
						Raportti{' '}
						{report.user && userDetails.user.id === report.user.id && (
							<Button onClick={() => navigate(`/report/${report.id}/edit`)}>
								Muokkaa
							</Button>
						)}
					</Card.Title>
					<Map center={center}>
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
					</ListGroup>
				</Card.Body>
			</Card>
		</div>
	)
}

export default InventoryReport
