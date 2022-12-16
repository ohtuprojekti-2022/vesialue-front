import React from 'react'
import { useNavigate } from 'react-router-dom'
import { parseCreator, formatDate } from '../../utils/tools'

/**
 * Renders a single edit request list item, containing some info about the report
 */
const EditedInventoryListItem = ({ report }) => {
	const navigate = useNavigate()
	return(
		<tr onClick={() => navigate(`/muokatut/${report.id}`)}>
			<td>{formatDate(report.inventorydate)}</td>
			<td>{parseCreator(report)}</td>
			<td>{report.editReason}</td>
		</tr>
	)
}

export default EditedInventoryListItem