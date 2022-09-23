import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import InventoryForm from './components/InventoryForm'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import MapDemo from './components/MapDemo'

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
				<Route path="inventointi-ilmoitus" element={<InventoryForm />} />
				<Route
					path="rekisteroidy"
					element={<RegistrationForm setUserDetails={setUserDetails} />}
				/>
				<Route
					path="kirjaudu"
					element={<LoginForm setUserDetails={setUserDetails} />}
				/>
				<Route path="kartta-demo" element={<MapDemo />} />
			</Routes>
		</Container>
	)
}

export default App
