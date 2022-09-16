import React from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RegistrationForm from './components/RegistrationForm'

const App = () => {
	return (
		<Container fluid>
			<Navbar />
			<Routes>
				<Route path="/" element={<>Hello world!</>} />
				<Route path="rekisteroidy" element={<RegistrationForm />} />
			</Routes>
		</Container>
	)
}

export default App
