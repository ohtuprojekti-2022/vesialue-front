import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const SortButton = ({ handleSort }) => {
	const filter = useSelector(({ filter }) => filter)

	return (
		<Button
			variant="outline-primary"
			onClick={handleSort}
			id="orderByDate"
			value=""
		>
			{filter.order && <>Uusin inventointi ensin</> || <>Vanhin inventointi ensin</>}
		</Button>
	)
}

export default SortButton