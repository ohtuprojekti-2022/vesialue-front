import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const SortButton = ({ handleSort }) => {
	const filter = useSelector(({ filter }) => filter)

	return (
		<div className="d-grid gap-2">
			<Button
				variant="outline-primary"
				onClick={handleSort}
				id="sortByDate"
				value=""
				data-testid="sortByDate"
			>
				{(filter.ascendingOrder && <>Vanhin inventointi ensin</>) || (
					<>Uusin inventointi ensin</>
				)}
			</Button>
		</div>
	)
}

export default SortButton
