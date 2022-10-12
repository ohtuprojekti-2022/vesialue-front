import React, {useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { getInventory } from '../../services/inventory-service'

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
			<>
				<p>404 not found</p>
			</>
		)
	}
	return (
		<div className='d-flex justify-content-around'>
			<Card style={{ width: '40rem' }}>
				<Card.Body>
					<Card.Text></Card.Text>
				</Card.Body>
			</Card>
		</div>
	)
}

export default InventoryReport
