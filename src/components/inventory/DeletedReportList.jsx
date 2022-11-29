import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Table } from 'react-bootstrap'
import DeletedInventoryItem from './DeletedInventoryItem'

const DeletedReportList = () => {
	const deletedInventories = useSelector((state) => {
		return state.deletedInventories
	})

	return (
		<Container>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>Tekijä</th>
						<th>Inventoinnin id</th>
						<th>Poiston syy</th>
					</tr>
				</thead>
				<tbody>
					{deletedInventories.map((report) => (
						<DeletedInventoryItem key={report.id} report={report} />
					))}
				</tbody>
			</Table>
		</Container>
	)
}

export default DeletedReportList
