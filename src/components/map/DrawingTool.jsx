/* istanbul ignore file */
import React from 'react'
import { FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

const DrawingTool = ({ setMapLayers }) => {
	const _onCreate = (e) => {
		const { layerType, layer } = e
		if (layerType === 'polygon') {
			const newLayer = { id: layer._leaflet_id, latlngs: layer.getLatLngs()[0] }
			setMapLayers((layers) => [...layers, newLayer])
		}
	}

	const _onDeleted = (e) => {
		const {
			layers: { _layers },
		} = e

		Object.values(_layers).map(({ _leaflet_id }) => {
			setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id))
		})
	}

	return (
		<FeatureGroup>
			<EditControl
				position="topright"
				onCreated={_onCreate}
				onDeleted={_onDeleted}
				draw={{
					rectangle: false,
					polyline: false,
					circle: false,
					circlemarker: false,
					marker: false,
				}}
			/>
		</FeatureGroup>
	)
}

export default DrawingTool
