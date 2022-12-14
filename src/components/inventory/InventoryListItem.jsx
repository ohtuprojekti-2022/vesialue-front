import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
	formatDate,
	parseCreator,
	translateMethod,
} from '../../utils/tools'


/**
 * Renders a single inventory report list item, containing some info about the report
 */
const InventoryListItem = ({ report, columns }) => {
	const navigate = useNavigate()

	const name = parseCreator(report)
	return (
		<tr onClick={() => navigate(`/raportti/${report.id}`)}>
			{columns.date && <td>{formatDate(report.inventorydate)}</td>}
			{columns.method && <td>{translateMethod(report.method, report.methodInfo)}</td>}
			{columns.creator && <td>{name}</td>}
			{columns.city && <td>{report.city}</td>}
		</tr>
	)
}

export default InventoryListItem
