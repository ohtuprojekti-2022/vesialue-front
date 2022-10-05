import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Inventory from './components/inventory/Inventory'
import Registration from './components/registration/Registration'
import Login from './components/login/Login'
import Map from './components/Map'

const Hello = ({ userDetails }) => {
	return (
		<>
			Hello{' '}
			{userDetails ? userDetails.user.username : !userDetails && 'world'}!
		</>
	)
}

const App = () => {
	const [userDetails, setUserDetails] = useState(
		JSON.parse(localStorage.getItem('userDetails'))
	)

	return (
		<Container fluid>
			<Navbar userDetails={userDetails} setUserDetails={setUserDetails} />
			<Routes>
				<Route path="/" element={<Hello userDetails={userDetails} />} />
				<Route path="inventointi-ilmoitus" element={<Inventory />} />
				<Route
					path="rekisteroidy"
					element={<Registration setUserDetails={setUserDetails} />}
				/>
				<Route
					path="kirjaudu"
					element={<Login setUserDetails={setUserDetails} />}
				/>
				<Route path="kartta-demo" element={<Map />} />
			</Routes>
		</Container>
	)
}

export default App
