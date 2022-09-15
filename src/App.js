import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
	return (
		<div className="container">
			<Navbar />
			<Routes>
				<Route path="/" element={<>Hello world!</>} />
			</Routes>
		</div>
	)
}

export default App
