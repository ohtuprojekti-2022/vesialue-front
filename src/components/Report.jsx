import React, { useState, useEffect } from 'react'
import { formatDate, getCity, translateMethod } from '../utils/tools'

const Report = ({ report }) => {
	const [city, setCity] = useState('')

	useEffect(() => {
		getCity(report.areas).then((response) => setCity(response))
	}, [])
	
	const name = report.name ? report.name : report.email

	return (
		<tr>
			<td>{formatDate(report.inventorydate)}</td>
			<td>{translateMethod(report.method)}</td>
			<td>{name}</td>
			<td>{city}</td>
		</tr>
	)
}

export default Report
