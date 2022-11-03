import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	formatDate,
	parseCreator,
	translateMethod,
} from '../../utils/tools'

const InventoryListItem = ({ report }) => {
	const navigate = useNavigate()

	const name = parseCreator(report)

	return (
		<tr onClick={() => navigate(`/report/${report.id}`)}>
			<td>{formatDate(report.inventorydate)}</td>
			<td>{translateMethod(report.method, report.methodInfo)}</td>
			{useLocation().pathname === '/' &&
				<td>{name}</td>
			}
			<td>{report.city}</td>
		</tr>
	)
}

export default InventoryListItem
