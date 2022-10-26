import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { getAllInventories } from '../services/inventory-service'
import Areas from './map/Areas'
import Map from './map/Map'
import InventoryList from './inventory/InventoryList'

function Frontpage() {
	const [inventories, setInventories] = useState(null)

	useEffect(() => {
		getAllInventories()
			.then((i) => setInventories(i))
			.catch(() => {
				if (
					window.confirm('Raporttien lataaminen epäonnistui! Yritä uudelleen?')
				) {
					window.location.reload()
				}
			})
	}, [])

	return (
		<Container>
			<Map>{inventories && <Areas inventories={inventories} />}</Map>
			<InventoryList/>
		</Container>
	)
}

export default Frontpage
