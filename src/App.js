import { Routes, Route, Link } from 'react-router-dom'
import Hello from './components/Hello'

const App = () => {
	return (
		<>
			<div>
				<Link to="/">root</Link>
				<br />
				<Link to="/component">/component</Link>
			</div>
			<Routes>
				<Route path="/component" element={<Hello />} />
				<Route path="/" element={<>Hello world!</>} />
			</Routes>
		</>
	)
}

export default App
