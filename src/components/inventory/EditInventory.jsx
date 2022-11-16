/* istanbul ignore file */
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCenter } from '../../utils/tools'
import Map from '../map/Map'

const AddInventory = () => {
	let { id } = useParams()
	const allInventories = useSelector(({ inventories }) => {
		return inventories
	})
	const allAreas = useSelector(({ areas }) => {
		return areas
	})
	/* const userDetails = useSelector(({ userDetails }) => {
		return userDetails
	}) */
	const [mapLayers, setMapLayers] = useState([])

	console.log(mapLayers)

	if (allInventories.length === 0 || allAreas.length === 0) {
		return <p>ladataan raporttia...</p>
	}

	const report = allInventories.filter(i => i.id === id)[0]
	const areas = allAreas.filter(a => a.inventoryId === report.id)
	const center = getCenter(
		areas.reduce((prev, current) => {
			return [...prev, getCenter(current.coordinates)]
		}, [])
	)

	return (
		<Container fluid="sm">
			<h2>Muokkaa raporttia</h2>
			<Map setMapLayers={setMapLayers} editableAreas={areas} center={center} />
		</Container>
	)
}

export default AddInventory
