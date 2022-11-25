/* istanbul ignore file */
import React from 'react'
import { FeatureGroup, Polygon } from 'react-leaflet'
import InventoryPopup from './InventoryPopup'

const Area = ({ details, coordinates }) => {
	const positionList = coordinates.map((c) => [c.lat, c.lng])
	const defaultStyle = {
		fillColor: '',
		fillOpacity: 0.2
	}

	const highlightArea = (e) => {
		const layer = e.target
		layer.setStyle({
			fillColor: '#CA6969',
			fillOpacity: 0.4
		})
	}
	const resetStyle = (e) => {
		const layer = e.target
		layer.setStyle(defaultStyle)
	}

	return (
		<FeatureGroup>
			<Polygon
				positions={positionList}
				eventHandlers={{
					mouseover: (e) => highlightArea(e),
					mouseout: (e) => resetStyle(e)
				}} />
			{details && <InventoryPopup details={details} />}
		</FeatureGroup>
	)
}

export default Area
