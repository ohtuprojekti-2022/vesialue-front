import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AddInventory from './components/inventory/AddInventory'
import InventoryReport from './components/inventory/InventoryReport'
import Registration from './components/registration/Registration'
import Login from './components/login/Login'
import Frontpage from './components/Frontpage'
import { useDispatch } from 'react-redux'
import { initializeInventories } from './redux/reducers/inventoryReducer'
import { initializeAreas } from './redux/reducers/areaReducer'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeInventories())
		dispatch(initializeAreas())
	}, [dispatch])
	const [userDetails, setUserDetails] = useState(
		JSON.parse(localStorage.getItem('userDetails'))
	)

	return (
		<Container fluid>
			<Navbar userDetails={userDetails} setUserDetails={setUserDetails} />
			<Routes>
				<Route path="/" element={<Frontpage />} />
				<Route path="inventointi-ilmoitus" element={<AddInventory />} />
				<Route
					path="rekisteroidy"
					element={<Registration setUserDetails={setUserDetails} />}
				/>
				<Route
					path="kirjaudu"
					element={<Login setUserDetails={setUserDetails} />}
				/>
				<Route path="report/:id" element={<InventoryReport />} />
			</Routes>
		</Container>
	)
}

export default App
