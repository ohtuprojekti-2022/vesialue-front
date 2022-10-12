import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Inventory from './components/inventory/Inventory'
import InventoryReport from './components/inventory/InventoryReport'
import Registration from './components/registration/Registration'
import Login from './components/login/Login'
import Frontpage from './components/Frontpage'



const App = () => {
	const [userDetails, setUserDetails] = useState(
		JSON.parse(localStorage.getItem('userDetails'))
	)

	return (
		<Container fluid>
			<Navbar userDetails={userDetails} setUserDetails={setUserDetails} />
			<Routes>
				<Route path="/" element={<Frontpage />} />
				<Route path="inventointi-ilmoitus" element={<Inventory />} />
				<Route
					path="rekisteroidy"
					element={<Registration setUserDetails={setUserDetails} />}
				/>
				<Route
					path="kirjaudu"
					element={<Login setUserDetails={setUserDetails} />}
				/>
				<Route
					path="report"
					element={<InventoryReport reportId={'6345717465d7e012d4ce650c'}/>}
				/>
			</Routes>
		</Container>
	)
}

export default App
