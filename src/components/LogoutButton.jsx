import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { logout } from '../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'

const LogoutButton = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleClick = () => {
		dispatch(logout())
		navigate('/')
	}
	return (
		<Button variant="primary" onClick={handleClick}>
			Kirjaudu ulos
		</Button>
	)
}

export default LogoutButton
