import React from 'react'
import { FeatureGroup, Polygon } from 'react-leaflet'

const Area = ({ coordinates }) => {
	const positionList = coordinates.map((c) => [c.lat, c.lng])

	return (
		<FeatureGroup>
			<Polygon positions={positionList} />
		</FeatureGroup>
	)
}

export default Area
