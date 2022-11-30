/* istanbul ignore file */
import React from 'react'
import { FeatureGroup, Polygon } from 'react-leaflet'
import InventoryPopup from './InventoryPopup'

const Area = ({ details, coordinates, activeLayer, setActiveLayer }) => {
	const positionList = coordinates.map((c) => [c.lat, c.lng])

	const handleClick = (e) => {
		if (setActiveLayer) {
			if (activeLayer)
				activeLayer.setStyle({
					fillColor: '',
					fillOpacity: 0.2,
				})
			const layer = e.target
			layer.bringToBack()
			layer.setStyle({
				fillColor: '#CA6969',
				fillOpacity: 0.4,
			})
			setActiveLayer(layer)
		}
	}

	return (
		<FeatureGroup>
			<Polygon
				positions={positionList}
				eventHandlers={{
					click: (e) => handleClick(e),
				}}
			/>
			{details && <InventoryPopup details={details} />}
		</FeatureGroup>
	)
}

export default Area
