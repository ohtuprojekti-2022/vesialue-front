import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
	formatDate,
	parseCreator,
	translateMethod,
} from '../../utils/tools'

const InventoryListItem = ({ report, columns }) => {
	const navigate = useNavigate()

	const name = parseCreator(report)
	return (
		<tr onClick={() => navigate(`/report/${report.id}`)}>
			{columns.date && <td>{formatDate(report.inventorydate)}</td>}
			{columns.method && <td>{translateMethod(report.method, report.methodInfo)}</td>}
			{(name !== '' && (<td>{name}</td>)) || name === '' && (
				<td>Tuntematon</td>
			)}
			{columns.city && <td>{report.city}</td>}
		</tr>
	)
}

export default InventoryListItem
