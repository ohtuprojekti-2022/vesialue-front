import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const LogoutButton = ({ setUserDetails }) => {
	const navigate = useNavigate()
	const handleClick = () => {
		localStorage.removeItem('userDetails')
		setUserDetails(null)
		navigate('/')
		location.reload()
	}
	return (
		<Button variant="primary" onClick={handleClick}>
			Kirjaudu ulos
		</Button>
	)
}

export default LogoutButton
