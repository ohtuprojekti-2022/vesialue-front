import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { getAllInventories } from '../services/inventory-service'
import Areas from './map/Areas'
import Map from './map/Map'
import ReportList from './ReportList'

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
			{inventories && <ReportList inventories={inventories}/>}
		</Container>
	)
}

export default Frontpage
