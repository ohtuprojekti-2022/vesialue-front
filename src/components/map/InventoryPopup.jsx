/* istanbul ignore file */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Popup } from 'react-leaflet'
import { translateMethod, formatDate, parseCreator } from '../../utils/tools'

const InventoryPopup = ({ details }) => {
	const navigate = useNavigate()
	return (
		<>
			<Popup>
				{translateMethod(details.method, details.methodInfo)}
				<br />
				{formatDate(details.inventorydate)}
				<br />
				{parseCreator(details)}
				<br />
				<Button onClick={() => navigate(`/raportti/${details.id}`)}>
					Avaa raportti
				</Button>
			</Popup>
		</>
	)
}

export default InventoryPopup
