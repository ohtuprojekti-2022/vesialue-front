import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Placeholder from 'react-bootstrap/Placeholder'
import { getInventory } from '../../services/inventory-service'
import Map from '../map/Map'
import Area from '../map/Area'

const InventoryReport = ({ reportId }) => {
	const [report, setReport] = useState(null)
	
	useEffect(() => {
		getInventory(reportId).then(r => {
			setReport(r)
		})
	}, [])
	
	console.log(report)
	
	if (!report) {
		return (
			<div className='d-flex justify-content-around'>
				<Card style={{ width: '40rem' }}>
					<Card.Body>
						<Placeholder as={Card.Title} animation="glow">
							<Placeholder xs={6} />
						</Placeholder>
						<Placeholder as={Card.Text} animation="glow">
							<Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
							<Placeholder xs={6} /> <Placeholder xs={8} />
						</Placeholder>
					</Card.Body>
				</Card>
			</div>
		)
	}
	return (
		<div className='d-flex justify-content-around'>
			<Card style={{ width: '40rem' }}>
				<Card.Body>
					<Card.Title>Ilmoitus</Card.Title>
					<Map>
						<Area coordinates={report.areas[0]} />
					</Map>
					<ListGroup>
						<ListGroup.Item>Päivä ja aika: {report.inventorydate}</ListGroup.Item>
						<ListGroup.Item>Tapa: {report.method}</ListGroup.Item>
						<ListGroup.Item>Lisätietoja: {report.moreInfo}</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
		</div>
	)
}

export default InventoryReport
