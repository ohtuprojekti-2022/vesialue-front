/* istanbul ignore file */
import React from 'react'
import { useEffect } from 'react'
import { FeatureGroup, Polygon, useMap } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

const DrawingTool = ({ setMapLayers, existingAreas }) => {
	const map = useMap()
	let addAreas = !existingAreas

	useEffect(() => {
		const layers = Object.values(map._layers)
			.filter((l) => l.options.isArea)
			.map((l) => {
				return { id: l._leaflet_id, latlngs: l.getLatLngs()[0] }
			})
		setMapLayers(() => [...layers])
	}, [])

	const _onCreate = (e) => {
		const { layerType, layer } = e
		if (layerType === 'polygon') {
			const newLayer = { id: layer._leaflet_id, latlngs: layer.getLatLngs()[0] }
			setMapLayers((layers) => [...layers, newLayer])
		}
	}

	const _onEdited = (e) => {
		const {
			layers: { _layers },
		} = e

		Object.values(_layers).map(({ _leaflet_id, _latlngs }) => {
			console.log(_leaflet_id)
			console.log(_latlngs)
		})
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
				onEdited={_onEdited}
				onDeleted={_onDeleted}
				draw={{
					polygon: addAreas,
					rectangle: false,
					polyline: false,
					circle: false,
					circlemarker: false,
					marker: false,
				}}
			/>
			{existingAreas &&
				existingAreas.map((area) => (
					<Polygon
						key={area.id}
						isArea={true}
						positions={area.coordinates.map((c) => [c.lat, c.lng])}
					/>
				))}
		</FeatureGroup>
	)
}

export default DrawingTool
