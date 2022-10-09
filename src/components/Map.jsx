import React from 'react'
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

const Map = ({ setMapLayers }) => {

	const center = {
		lat: 60.170702505729416,
		lng: 24.941444393533125,
	}

	const _onCreate = (e) => {
		const { layerType, layer } = e
		if (layerType === 'polygon') {
			const newLayer = { id: layer._leaflet_id, latlngs: layer.getLatLngs()[0] }
			setMapLayers((layers) => [...layers, newLayer])
		}
	}

	const _onEditPath = (e) => {
		console.log(e)
		const {
			layers: { _layers },
		} = e

		Object.values(_layers).map(({ _leaflet_id, editing }) => {
			setMapLayers((layers) =>
				layers.map((l) =>
					l.id === _leaflet_id
						? { ...l, latlngs: { ...editing.latlngs[0] } }
						: l
				)
			)
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
		<>
			<MapContainer
				style={{ height: '500px', width: '100%' }}
				center={center}
				zoom={13}
				scrollWheelZoom={true}
			>
				<FeatureGroup>
					<EditControl
						position="topright"
						onCreated={_onCreate}
						onEdited={_onEditPath}
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
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</>
	)
}

export default Map
