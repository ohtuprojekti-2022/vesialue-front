/* istanbul ignore file */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Alert } from 'react-bootstrap'
import { loginRequest } from '../../services/user-service'
import LoginForm from './LoginForm'
import { login } from '../../redux/reducers/userReducer'
import { initializeInventories } from '../../redux/reducers/inventoryReducer'
import { useDispatch } from 'react-redux'
import { initializeEditedInventories } from '../../redux/reducers/editedInventoryReducer'

/**
 * Functionality for logging in a user
 */
const Login = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [validated, setValidated] = useState(false)
	const [alert, setAlert] = useState(null)
	const navigate = useNavigate()

	const addAlert = text => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const handleSubmit = async event => {
		const form = event.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()
		if (valid) {
			try {
				const data = await loginRequest(username, password)
				dispatch(login(data))

				setUsername('')
				setPassword('')
				setValidated(false)
				dispatch(initializeInventories())
				dispatch(initializeEditedInventories())
				navigate('/')
			} catch (error) {
				if (error.response.data.message === 'Invalid username or password.') {
					addAlert('Väärä käyttäjänimi tai salasana')
				} else {
					addAlert(error.response.data.message)
				}
			}
		}
	}

	return (
		<Container fluid="sm" style={{ marginBottom: '1rem' }}>
			<h2>Kirjaudu sisään</h2>
			{alert && <Alert variant="danger">{alert}</Alert>}
			<LoginForm
				validated={validated}
				handleSubmit={handleSubmit}
				setUsername={setUsername}
				setPassword={setPassword}
			/>
			<a
				href="#"
				className="text-secondary"
				onClick={() => navigate('/rekisteroidy')}
			>
				Rekisteröi uusi käyttäjä
			</a>
		</Container>
	)
}

export default Login
