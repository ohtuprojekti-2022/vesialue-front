import React from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import EditedInventoryListItem from './EditedInventoryItem'


const EditedReportList = ({ columns }) => {
	const editedInventories = useSelector(({editedInventories}) => {
		return editedInventories
	})

	columns = columns
		? columns
		: { date: true, creator: true, reason: true }
	
	const render = option => option === undefined ? true : option
	const date = render(columns.date)
	const creator = render(columns.creator)
	const reason = render(columns.reason)
	
	return(
		<Table striped hover responsive>
			<thead>
				<tr>
					{date && <th>Inventoinnin päivämäärä</th>}
					{creator && <th>Tekijä</th>}
					{reason && <th>Muokkauksen syy</th>}
				</tr>
			</thead>
			<tbody>
				{editedInventories.map(report => (
					<EditedInventoryListItem
						key={report.id}
						columns={{ date,  creator, reason }}
						report={report}
					/>
				))}
			</tbody>
		</Table>
	)
}

export default EditedReportList