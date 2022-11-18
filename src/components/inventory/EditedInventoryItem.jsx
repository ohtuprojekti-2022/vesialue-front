import React from 'react'
import { useNavigate } from 'react-router-dom'
import { parseCreator, formatDate } from '../../utils/tools'

const EditedInventoryListItem = ({ report, columns }) => {
	const navigate = useNavigate()
	return(
		<tr onClick={() => navigate(`/muokatut/${report.id}`)}>
			{columns.date && <td>{formatDate(report.inventorydate)}</td>}
			<td>{parseCreator(report)}</td>
			{columns.reason && <td>{report.editReason}</td>}
		</tr>
	)
}

export default EditedInventoryListItem