import React from 'react'
import { Container } from 'react-bootstrap'
import Areas from './map/Areas'
import Map from './map/Map'
import PaginatedList from './PaginatedList'
import FilterForm from './FilterForm'

function Frontpage() {
	return (
		<Container>
			<Map>
				<Areas />
			</Map>
			<FilterForm />
			<PaginatedList />
		</Container>
	)
}

export default Frontpage
