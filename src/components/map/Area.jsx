import React from 'react'
import { FeatureGroup, Polygon } from 'react-leaflet'
import InventoryPopup from './InventoryPopup'

const Area = ({ details, coordinates }) => {
	const positionList = coordinates.map((c) => [c.lat, c.lng])

	return (
		<FeatureGroup>
			<Polygon positions={positionList} />
			<InventoryPopup details={details} />
		</FeatureGroup>
	)
}

export default Area
