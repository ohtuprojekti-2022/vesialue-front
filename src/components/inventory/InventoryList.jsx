import React from 'react'
import InventoryListItem from './InventoryListItem'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import { filteredInventoriesAndAreas } from '../../utils/tools'

const InventoryList = () => {
	const [inventories, areas] = useSelector(({ inventories, areas, filter }) => {
		return filteredInventoriesAndAreas(inventories, areas, filter)
	})

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Inventoinnin päivämäärä</th>
					<th>Havainnon tyyppi</th>
					<th>Tekijä</th>
					<th>Kaupunki</th>
				</tr>
			</thead>
			<tbody>
				{areas.length > 0 &&
					inventories.map(report => (
						<InventoryListItem key={report.id} report={report} />
					))}
			</tbody>
		</Table>
	)
}

export default InventoryList
