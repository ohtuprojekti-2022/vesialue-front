import React from 'react'
import { Container } from 'react-bootstrap'
import Areas from './map/Areas'
import Map from './map/Map'
import PaginatedList from './PaginatedList'
import FilterForm from './FilterForm'

/**
 * Renders all the components used in the front page of the application
 */
function Frontpage() {
	return (
		<Container>
			<Map>
				<Areas />
			</Map>
			<FilterForm />
			<PaginatedList perPageNumber={20} />
		</Container>
	)
}

export default Frontpage
