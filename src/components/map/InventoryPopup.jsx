import React from 'react'
import { Button } from 'react-bootstrap'
import { Popup } from 'react-leaflet'

const InventoryPopup = ({ details }) => {
	let method = ''
	switch (details.method) {
	case 'sight':
		method = 'Näköhavainto'
		break
	case 'echo':
		method = 'Viistokaiutus'
		break
	case 'dive':
		method = 'Sukellus'
		break
	case 'other':
		method = details.methodInfo
	}
	return (
		<>
			<Popup>
				{method}
				<br />
				{details.inventorydate.substring(8, 10)}.
				{details.inventorydate.substring(5, 7)}.
				{details.inventorydate.substring(0, 4)}
				<br />
				<Button onClick={() => alert('not implemented')} >Avaa raportti</Button>
			</Popup>
		</>
	)
}

export default InventoryPopup
