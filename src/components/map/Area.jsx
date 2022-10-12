import React from 'react'
import { FeatureGroup, Polygon } from 'react-leaflet'

const Area = ({ id, coordinates }) => {
	const positionList = coordinates.map((c) => [c.lat, c.lng])

	return (
		<FeatureGroup key={id}>
			<Polygon positions={positionList} />
		</FeatureGroup>
	)
}

export default Area
