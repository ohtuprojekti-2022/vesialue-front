/* istanbul ignore file */
import React, { useState } from 'react'
import Area from './Area'
import { useSelector } from 'react-redux'
import { filteredInventoriesAndAreas } from '../../utils/tools'
import { useMapEvents } from 'react-leaflet'

const Areas = () => {
	const [activeLayer, setActiveLayer] = useState()
	useMapEvents({
		click: () => {
			if (activeLayer.setStyle)
				activeLayer.setStyle({
					fillColor: '',
					fillOpacity: 0.2,
				})
		},
	})
	const [inventories, areas] = useSelector(({ inventories, areas, filter }) => {
		return filteredInventoriesAndAreas(inventories, areas, filter)
	})

	return (
		<>
			{areas &&
				areas.map((a) => (
					<Area
						key={a.id}
						details={inventories.filter((i) => i.id === a.inventoryId)[0]}
						coordinates={a.coordinates}
						activeLayer={activeLayer}
						setActiveLayer={setActiveLayer}
					/>
				))}
		</>
	)
}

export default Areas
