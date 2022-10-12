import React from 'react'
import { Container} from 'react-bootstrap'
import Map from './map/Map'

function Frontpage() {

	return (
		<Container>
			<Map />
			<p>
				Yläpuolella näkyy kartta, johon ei voi piirtää.
			</p>
		</Container>
	)
}

export default Frontpage
