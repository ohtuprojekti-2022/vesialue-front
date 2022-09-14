import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
	return (
		<>
			<div>
				<Navbar></Navbar>
			</div>
			<Routes>
				<Route path="/" element={<>Hello world!</>} />
			</Routes>
		</>
	)
}

export default App
