/* istanbul ignore file */
import React, { useEffect, useState } from 'react'
import Area from './Area'
import { getAllAreas } from '../../services/inventory-service'

const Areas = ({ inventories }) => {
	const [areas, setAreas] = useState(null)

	useEffect(() => {
		getAllAreas()
			.then((a) => setAreas(a))
			.catch(() => {
				if (
					window.confirm('Alueiden lataaminen epäonnistui! Yritä uudelleen?')
				) {
					window.location.reload()
				}
			})
	}, [])

	return (
		<>
			{areas &&
				areas.map((a) => (
					<Area
						key={a.id}
						details={inventories.filter((i) => i.id === a.inventoryId)[0]}
						coordinates={a.coordinates}
					/>
				))}
		</>
	)
}

export default Areas
