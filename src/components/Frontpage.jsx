import React from 'react'
import { Container } from 'react-bootstrap'
import Areas from './map/Areas'
import Map from './map/Map'
import InventoryList from './inventory/InventoryList'
import FilterForm from './FilterForm'

function Frontpage() {
	return (
		<Container>
			<Map>
				<Areas />
			</Map>
			<FilterForm />
			<InventoryList />
		</Container>
	)
}

export default Frontpage
