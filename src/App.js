import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Frontpage from './components/Frontpage'
import AddInventory from './components/inventory/AddInventory'
import Registration from './components/registration/Registration'
import Login from './components/login/Login'
import InventoryReport from './components/inventory/InventoryReport'
import EditInventory from './components/inventory/EditInventory'
import DeleteInventoryForm from './components/inventory/DeleteInventoryForm'
import UserPage from './components/user/UserPage'
import EditedReport from './components/inventory/EditedReport'
import EditedReportList from './components/inventory/EditedReportList'
import UploadTest from './components/UploadTest'
import DeletedReportList from './components/inventory/DeletedReportList'
import { useDispatch } from 'react-redux'
import { initializeInventories } from './redux/reducers/inventoryReducer'
import { initializeAreas } from './redux/reducers/areaReducer'
import { initializeEditedInventories } from './redux/reducers/editedInventoryReducer'
import { initializeDeletedInventories } from './redux/reducers/deletedInventoryReducer'
import { useSelector } from 'react-redux'
import { selectAdminStatus } from './redux/reducers/userReducer'
import { Navigate } from 'react-router-dom'
import Footer from './components/footer'
import TermsofserviceModal from './components/TermsofserviceModal'
import PrivacyPolicyModal from './components/PrivacyPolicyModal'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeInventories())
		dispatch(initializeAreas())
		dispatch(initializeEditedInventories())
		dispatch(initializeDeletedInventories())
	}, [dispatch])

	const [userDetails, admin] = useSelector(state => [
		state.userDetails,
		selectAdminStatus(state),
	])

	const [showTOS, setShowTOS] = useState(false)
	const [showPP, setShowPP] = useState(false)

	return (
		<Container
			fluid
			style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
		>
			<Navbar />
			<Routes>
				<Route path="/" element={<Frontpage />} />
				<Route path="inventointi-ilmoitus" element={<AddInventory />} />
				<Route path="rekisteroidy" element={<Registration />} />
				<Route path="kirjaudu" element={<Login />} />
				<Route path="report/:id" element={<InventoryReport />} />
				<Route path="report/:id/edit" element={<EditInventory />} />
				<Route path="report/:id/delete" element={<DeleteInventoryForm />} />
				<Route
					path="omasivu"
					element={userDetails ? <UserPage /> : <Navigate to="/kirjaudu" />}
				/>
				<Route
					path="muokatut/:id"
					element={admin ? <EditedReport /> : <Navigate to="/" />}
				/>
				<Route
					path="muokatut"
					element={admin ? <EditedReportList /> : <Navigate to="/" />}
				/>
				<Route path="uploadtest" element={<UploadTest/>} />
				<Route
					path="poistetut"
					element={admin ? <DeletedReportList /> : <Navigate to="/" />}
				/>
			</Routes>
			<TermsofserviceModal show={showTOS} close={() => setShowTOS(false)} />
			<PrivacyPolicyModal show={showPP} close={() => setShowPP(false)} />
			<Footer setShowTOS={setShowTOS} setShowPP={setShowPP} />
		</Container>
	)
}

export default App
