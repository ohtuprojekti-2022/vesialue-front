import React from 'react'
import { useNavigate } from 'react-router-dom'
import { parseCreator, formatDate } from '../../utils/tools'

const EditedInventoryListItem = ({ report, columns }) => {
	const name = parseCreator(report)
	const navigate = useNavigate()
	return(
		<tr onClick={() => navigate(`/muokatut/${report.id}`)}>
			{columns.date && <td>{formatDate(report.inventorydate)}</td>}
			{columns.creator && (name !== '' && (<td>{name}</td>)) || name === '' && (
				<td>Tuntematon</td>
			)}
			{columns.reason && <td>{report.editReason}</td>}
		</tr>
	)
}

export default EditedInventoryListItem