import React from 'react'
import InventoryListItem from './InventoryListItem'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import { filteredInventoriesAndAreas } from '../../utils/tools'

const InventoryList = ({ columns }) => {
	const [inventories, areas] = useSelector(({ inventories, areas, filter }) => {
		return filteredInventoriesAndAreas(inventories, areas, filter)
	})

	columns = columns
		? columns
		: { date: true, method: true, creator: true, city: true }

	const render = option => option === undefined ? true : option
	const date = render(columns.date)
	const method = render(columns.method)
	const creator = render(columns.creator)
	const city = render(columns.city)

	return (
		<Table striped bordered hover responsive>
			<thead>
				<tr>
					{date && <th>Inventoinnin päivämäärä</th>}
					{method && <th>Havainnon tyyppi</th>}
					{creator && <th>Tekijä</th>}
					{city && <th>Kaupunki</th>}
				</tr>
			</thead>
			<tbody>
				{areas.length > 0 &&
					inventories.map(report => (
						<InventoryListItem
							key={report.id}
							columns={{ date, method, creator, city }}
							report={report}
						/>
					))}
			</tbody>
		</Table>
	)
}

export default InventoryList
