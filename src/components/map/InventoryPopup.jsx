/* istanbul ignore file */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Popup } from 'react-leaflet'
import { translateMethod, formatDate } from '../../utils/tools'

const InventoryPopup = ({ details }) => {
	const navigate = useNavigate()
	return (
		<>
			<Popup>
				{translateMethod(details.method, details.methodInfo)}
				<br />
				{formatDate(details.inventorydate)}
				<br />
				<Button onClick={() => navigate(`/report/${details.id}`)} >Avaa raportti</Button>
			</Popup>
		</>
	)
}

export default InventoryPopup
