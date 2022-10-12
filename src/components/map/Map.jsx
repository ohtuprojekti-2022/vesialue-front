import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import DrawingTool from './DrawingTool'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

const Map = ({ setMapLayers }) => {
	const center = {
		lat: 60.170702505729416,
		lng: 24.941444393533125,
	}

	return (
		<>
			<MapContainer
				style={{ height: '500px', width: '100%' }}
				center={center}
				zoom={13}
				scrollWheelZoom={true}
			>
				{setMapLayers && <DrawingTool setMapLayers={setMapLayers} />}
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</>
	)
}

export default Map
