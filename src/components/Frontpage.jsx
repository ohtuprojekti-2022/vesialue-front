import React from 'react'
import { Container} from 'react-bootstrap'
import FrontMap from './FrontMap'

function Frontpage() {

	return (
		<Container>
			<FrontMap />
			<p>
				Yläpuolella näkyy kartta, johon ei voi piirtää.
			</p>
		</Container>
	)
}

export default Frontpage
