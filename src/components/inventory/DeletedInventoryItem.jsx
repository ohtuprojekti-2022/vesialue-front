import React from 'react'
import { useNavigate } from 'react-router-dom'
import { parseCreator } from '../../utils/tools'

const DeletedInventoryItem = ({ report }) => {
	const navigate = useNavigate()
	return(
		<tr onClick={() => navigate(`/raportti/${report.inventory}`)}>
			<td>{parseCreator(report)}</td>
			<td>{report.inventory}</td>
			<td>{report.reason}</td>
		</tr>
	)
}

export default DeletedInventoryItem