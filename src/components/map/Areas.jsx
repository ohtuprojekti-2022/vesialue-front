/* istanbul ignore file */
import React from 'react'
import Area from './Area'
import { useSelector } from 'react-redux'
import { filteredInventoriesAndAreas } from '../../utils/tools'

const Areas = () => {
	const [inventories, areas] = useSelector(({ inventories, areas, filter }) => {
		return filteredInventoriesAndAreas(inventories, areas, filter)
	})

	return (
		<>
			{areas &&
				areas.map(a => (
					<Area
						key={a.id}
						details={inventories.filter(i => i.id === a.inventoryId)[0]}
						coordinates={a.coordinates}
					/>
				))}
		</>
	)
}

export default Areas
