import React from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import EditedInventoryListItem from './EditedInventoryItem'



const EditedReportList = () => {
	const editedInventories = useSelector((state) => {
		return state.editedInventories
	})


	return (
		<Table striped bordered hover responsive>
			<thead>
				<tr>
					<th>Inventoinnin päivämäärä</th>
					<th>Tekijä</th>
					<th>Muokkauksen syy</th>
				</tr>
			</thead>
			<tbody>
				{editedInventories.map(report => (
					<EditedInventoryListItem
						key={report.id}
						report={report}
					/>
				))}
			</tbody>
		</Table>
	)
}

export default EditedReportList