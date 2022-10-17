import React, {useState, useEffect} from 'react'
import getCity from '../utils/tools'




const Report = ({ report }) => {

	const [city, setCity] = useState('')
	
	useEffect(() => {
		getCity(report.areas).then((response) => setCity(response))
	},[])
	
	

	const name = report.name ? report.name : report.email
	


	let method = ''
	switch (report.method) {
	case 'echo':
		method = 'Viistokaiutus'
		break
	case 'other':
		method = report.methodInfo
		break
	case 'sight':
		method = 'Näköhavainto'
		break
	case 'dive':
		method = 'Sukellus'
	}
	return(
		<tr><td>{report.inventorydate}</td><td>{method}</td><td>{name}</td><td>{city}</td></tr>
	)
}

export default Report