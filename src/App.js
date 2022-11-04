import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Frontpage from './components/Frontpage'
import AddInventory from './components/inventory/AddInventory'
import Registration from './components/registration/Registration'
import Login from './components/login/Login'
import InventoryReport from './components/inventory/InventoryReport'
import EditInventory from './components/inventory/EditInventory'
import UserPage from './components/UserPage'
import { useDispatch } from 'react-redux'
import { initializeInventories } from './redux/reducers/inventoryReducer'
import { initializeAreas } from './redux/reducers/areaReducer'

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
				<Route path="report/:id/edit" element={<EditInventory />} />
				<Route path="omasivu" element={<UserPage />} />
			</Routes>
		</Container>
	)
}

export default App
