import React, {useState} from 'react'
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { passwordEditRequest } from '../../services/user-service'
import { Alert } from 'react-bootstrap'
import { login } from '../../redux/reducers/userReducer'

const PasswordEditModal = ({show, close}) => {
	
	const dispatch = useDispatch()
	const userDetails = useSelector(({ userDetails }) => {
		return userDetails
	})
	const username = userDetails.user.username
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [validated, setValidated] = useState(false)
	const [alert, setAlert] = useState(null)
	const [formSubmitionStatus, setFormSubmitionStatus] = useState('notSubmitted')

	const addAlert = (text) => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const handleSubmit = async (event) => {
		const form = event.target
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()
		if (valid) {
			try {
				const data = await passwordEditRequest(username, currentPassword, newPassword)
				dispatch(login(data))
				setFormSubmitionStatus('submitted')
				setValidated(false)
			} catch (error) {
				if (error.response.data.message === 'Invalid current password.') {
					addAlert('Väärä salasana.')
				}
				else if (error.response.data.message === 'Password too short.') {
					addAlert('Uusi salasana liian lyhyt.')
				} else {
					addAlert(error.response.data.message)
				}
			}
		}
	}

	const closeModal = () => {
		close()
		setFormSubmitionStatus('notSubmitted')
		
	}

	const PasswordForm = (
		<Form
			noValidate
			validated={validated}
			onSubmit={handleSubmit}
			data-testid="passwordedit-form"
		>
			<FloatingLabel controlId="current-password" className="mb-3" label="Nykyinen salasana">
				<Form.Control
					data-testid="current-password"
					type="password"
					onChange={e => setCurrentPassword(e.target.value)}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna salasana!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="new-password" className="mb-3" label="Uusi salasana">
				<Form.Control
					data-testid="new-password"
					type="password"
					minLength="10"
					onChange={e => setNewPassword(e.target.value)}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Anna vähintään 10 merkkiä pitkä salasana!
				</Form.Control.Feedback>
			</FloatingLabel>
			<FloatingLabel controlId="new-password2" className="mb-3" label="Salasana uudestaan">
				<Form.Control
					data-testid="new-password2"
					type="password"
					pattern={newPassword}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Salasanat eivät täsmää!
				</Form.Control.Feedback>
			</FloatingLabel>
			<Button variant="primary" type="submit">
				Tallenna
			</Button>
		</Form>
	)

	return (
		<div className="container" data-testid="password-modal">
			<Modal size="lg" show={show} onHide={()=> closeModal()} 
				style={{ zIndex: 2001 }}>
				<Modal.Header closeButton>
					<Modal.Title>Vaihda salasana</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{alert && <Alert variant="danger">{alert}</Alert>}
					{formSubmitionStatus === 'notSubmitted' && PasswordForm}
					{formSubmitionStatus === 'submitted' && (
						<div>
							<h5>Salasana vaihdettu! </h5>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default PasswordEditModal
