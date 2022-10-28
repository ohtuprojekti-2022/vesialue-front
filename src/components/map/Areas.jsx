/* istanbul ignore file */
import React from 'react'
import Area from './Area'
import { useSelector } from 'react-redux'

const Areas = () => {
	const inventories = useSelector(({inventories}) => {
		return inventories
	})
	
	const areas = useSelector(({areas}) => {
		return areas
	})

	return (
		<>
			{areas &&
				areas.map((a) => (
					<Area
						key={a.id}
						details={inventories.filter((i) => i.id === a.inventoryId)[0]}
						coordinates={a.coordinates}
					/>
				))}
		</>
	)
}

export default Areas
