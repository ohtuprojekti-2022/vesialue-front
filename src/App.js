import React, { useEffect } from 'react'
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
import { initializeUserDetails } from './redux/reducers/userReducer'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeInventories())
		dispatch(initializeAreas())
	}, [dispatch])

	return (
		<Container fluid>
			<Navbar />
			<Routes>
				<Route path="/" element={<Frontpage />} />
				<Route path="inventointi-ilmoitus" element={<AddInventory />} />
				<Route
					path="rekisteroidy"
					element={<Registration />}
				/>
				<Route
					path="kirjaudu"
					element={<Login />}
				/>
				<Route path="report/:id" element={<InventoryReport />} />
			</Routes>
		</Container>
	)
}

export default App
