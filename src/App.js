import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Hello from './components/Hello'
import Navbar from './components/Navbar'

const App = () => {
	return (
		<>
			<div>
				<Navbar></Navbar>
			</div>
			<Routes>
				<Route path="/component" element={<Hello />} />
				<Route path="/" element={<>Hello world!</>} />
			</Routes>
		</>
	)
}

export default App
