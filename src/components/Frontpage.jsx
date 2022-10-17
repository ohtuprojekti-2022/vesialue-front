import React from 'react'
import { Container } from 'react-bootstrap'
import Areas from './map/Areas'
import Map from './map/Map'

function Frontpage() {
	return (
		<Container>
			<Map>
				<Areas />
			</Map>
		</Container>
	)
}

export default Frontpage
