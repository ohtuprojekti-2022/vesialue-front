import React from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginForm from './components/Login/LoginForm'

const App = () => {
	return (
		<Container fluid>
			<Navbar />
			<Routes>
				<Route path="/" element={<>Hello world!</>} />
				<Route path="kirjaudu" element={<LoginForm />} />
			</Routes>
		</Container>
	)
}

export default App
