/* istanbul ignore file */
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FeatureGroup, Polygon, useMap } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

/*
	There is a problem with react-leaflet-draw where preloaded polygons
	are not visually updated correctly when editing.
	The problem is solved here with a hack where elements are quickly
	programmatically clicked.
	Parts of the hack are highlighted with comments
*/
const DrawingTool = ({ setMapLayers, existingAreas }) => {
	//-----PART OF THE HACK-----vv
	const [areas, setAreas] = useState(existingAreas)
	//--------------------------^^
	const map = useMap()
	let addAreas = !existingAreas

	useEffect(() => {
		const layers = Object.values(map._layers)
			.filter(l => l.options.isArea)
			.map(l => {
				return { id: l._leaflet_id, latlngs: l.getLatLngs()[0] }
			})
		setMapLayers(() => [...layers])
	}, [])

	//-----PART OF THE HACK-----vv
	useEffect(() => {
		const editButton = document.querySelector('.leaflet-draw-edit-edit')
		editButton.click()
		const cancelButton = document.querySelector(
			'a[title="Cancel editing, discards all changes"]'
		)
		const timer = setTimeout(() => {
			if (cancelButton) cancelButton.click()
		}, 50)
		return () => clearTimeout(timer)
	})
	//--------------------------^^

	const _onCreate = e => {
		const { layerType, layer } = e
		if (layerType === 'polygon') {
			const newLayer = { id: layer._leaflet_id, latlngs: layer.getLatLngs()[0] }
			setMapLayers(layers => [...layers, newLayer])
		}
	}

	const _onEdited = e => {
		const {
			layers: { _layers },
		} = e

		Object.values(_layers).map(({ _leaflet_id, _latlngs, options }) => {
			//-----PART OF THE HACK-----vv
			setAreas(areas =>
				areas.map(a =>
					a.id === options.edit_id ? { ...a, coordinates: _latlngs[0] } : a
				)
			)
			//--------------------------^^
			setMapLayers(layers =>
				layers.map(l =>
					l.id === _leaflet_id ? { ...l, latlngs: _latlngs[0] } : l
				)
			)
		})
	}

	const _onDeleted = e => {
		const {
			layers: { _layers },
		} = e

		Object.values(_layers).map(({ _leaflet_id }) => {
			setMapLayers(layers => layers.filter(l => l.id !== _leaflet_id))
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
			{areas &&
				areas.map(area => (
					<Polygon
						className="timeline-layer-polygon-editable"
						key={area.id}
						//-----PART OF THE HACK-----vv
						edit_id={area.id}
						//--------------------------^^
						isArea={true}
						positions={area.coordinates.map(c => [c.lat, c.lng])}
					/>
				))}
		</FeatureGroup>
	)
}

export default DrawingTool
