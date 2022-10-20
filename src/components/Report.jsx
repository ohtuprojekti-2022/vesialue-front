import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDate, getCity, parseCreator, translateMethod } from '../utils/tools'

const Report = ({ report }) => {
	const [city, setCity] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		getCity(report.areas).then((response) => setCity(response))
	}, [])

	const name = parseCreator(report)

	return (
		<tr onClick={() => navigate(`/report/${report.id}`)}>
			<td>{formatDate(report.inventorydate)}</td>
			<td>{translateMethod(report.method, report.methodInfo)}</td>
			<td>{name}</td>
			<td>{city}</td>
		</tr>
	)
}

export default Report
