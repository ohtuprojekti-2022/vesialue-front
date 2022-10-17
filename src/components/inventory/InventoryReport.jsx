import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Placeholder from 'react-bootstrap/Placeholder'
import { getInventory } from '../../services/inventory-service'
import Map from '../map/Map'
import Area from '../map/Area'
import { formatDate, translateMethod } from '../../utils/tools'

const InventoryReport = () => {
	const [report, setReport] = useState(null)
	
	let { id } = useParams()
	
	useEffect(() => {
		getInventory(id).then(r => {
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
						<Area details={report} coordinates={report.areas[0]} />
					</Map>
					<ListGroup>
						<ListGroup.Item>Päivämäärä: {formatDate(report.inventorydate)}</ListGroup.Item>
						<ListGroup.Item>Tapa: {translateMethod(report.method)}</ListGroup.Item>
						<ListGroup.Item>Lisätietoja: {report.moreInfo}</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
		</div>
	)
}

export default InventoryReport
