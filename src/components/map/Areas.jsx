import React, { useEffect, useState } from 'react'
import Area from './Area'
import { getAllAreas } from '../../services/inventory-service'

const Areas = () => {
	const [areas, setAreas] = useState([])

	useEffect(() => {
		getAllAreas().then((a) => setAreas(a))
	}, [])

	return (
		<>
			{areas &&
				areas.map((a) => <Area key={a.id} coordinates={a.coordinates} />)}
		</>
	)
}

export default Areas
