import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Table } from 'react-bootstrap'
import EditedInventoryListItem from './EditedInventoryItem'

/**
 * Renders a list of all edit requests
 */
const EditedReportList = () => {
	const editedInventories = useSelector((state) => {
		return state.editedInventories
	})

	return (
		<Container>
			<h2>Muokkauspyynnöt</h2>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>Inventoinnin päivämäärä</th>
						<th>Tekijä</th>
						<th>Muokkauksen syy</th>
					</tr>
				</thead>
				<tbody>
					{editedInventories.map((report) => (
						<EditedInventoryListItem key={report.id} report={report} />
					))}
				</tbody>
			</Table>
		</Container>
	)
}

export default EditedReportList
