/* istanbul ignore file */
import React from 'react'
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import DrawingTool from './DrawingTool'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

const Map = ({ center, zoom, setMapLayers, editableAreas, children }) => {
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
				<LayersControl position="topright">
					<LayersControl.BaseLayer checked name="OpenStreetMap">
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Maastokartta">
						<TileLayer
							attribution='<a href="https://www.maanmittauslaitos.fi/avoindata-lisenssi-cc40">Maanmittauslaitos</a> TMS <a href="https://kartat.kapsi.fi/#Peruskarttarasteri">Peruskartta</a>'
							url="https://tiles.kartat.kapsi.fi/peruskartta/{z}/{x}/{y}.jpg"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Satelliitti">
						<TileLayer
							attribution='&copy; <a href="https://www.esri.com/en-us/legal/overview">Esri</a> contributors'
							url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.Overlay name="Merimerkit">
						<TileLayer
							attribution='&copy; <a href="https://openseamap.org/index.php?id=imprint&L=1">OpenSeaMap</a> contributors'
							url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
						/>
					</LayersControl.Overlay>
				</LayersControl>
				{setMapLayers && <DrawingTool setMapLayers={setMapLayers} existingAreas={editableAreas} />}
				{children}
			</MapContainer>
		</>
	)
}

export default Map
