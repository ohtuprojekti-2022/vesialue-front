/* istanbul ignore file */
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import DrawingTool from './DrawingTool'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

const Map = ({ center, zoom, setMapLayers, children }) => {
	if (!center) center = { lat: 60.170702505729416, lng: 24.941444393533125 }
	if (!zoom) zoom = 12

	return (
		<>
			<MapContainer
				style={{ height: '500px', width: '100%' }}
				center={center}
				zoom={zoom}
				scrollWheelZoom={true}
			>
				{setMapLayers && <DrawingTool setMapLayers={setMapLayers} />}
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{children}
			</MapContainer>
		</>
	)
}

export default Map
