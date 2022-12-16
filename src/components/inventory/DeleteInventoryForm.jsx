import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectInventoryById } from '../../redux/reducers/inventoryReducer'
import { requestDelete } from '../../services/inventory-service'
import { appendDeletedInventories } from '../../redux/reducers/deletedInventoryReducer'

/**
 * Renders a form that allows users to submit a deletion request and specify a reason for doing so
 */
const DeleteInventoryForm = () => {
	let { id } = useParams()
	const [deleteReason, setDeleteReason] = useState('')
	const [report] = useSelector(state => {
		return [selectInventoryById(state, id)]
	})
	const dispatch = useDispatch()
	const [validated, setValidated] = useState(false)
	const navigate = useNavigate()

	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = (e) => {
		const form = e.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		e.preventDefault()
		if (valid) setShow(true)
	}


	const handleSubmit = async e => {
		e.preventDefault()
		try {
			setValidated(true)

			const result = await requestDelete(deleteReason, report.id)

			dispatch(appendDeletedInventories(result))

			navigate(`/raportti/${report.id}`)
		} catch (error) {
			console.log('deletion request failed')
		}
	}

	return (
		<Container>
			<Form
				style={{ marginTop: '1rem', marginBottom: '1rem' }}
				noValidate
				validated={validated}
				onSubmit={handleShow}
			>
				<FloatingLabel
					controlId="deleteReason"
					label="Poiston syy"
					className="mb-3"
				>
					<Form.Control
						data-testid="deleteReason"
						type="text"
						maxLength="500"
						defaultValue={deleteReason}
						onChange={e => setDeleteReason(e.target.value)}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Syy poistolle vaaditaan. {'(max 500 merkkiä)'}
					</Form.Control.Feedback>
				</FloatingLabel>
				<Button type="submit">Pyydä inventoinnin poistoa</Button>
			</Form>
			<Modal size="lg" show={show} onHide={handleClose} style={{ zIndex: 2001 }}>
				<Modal.Header closeButton>
					<Modal.Title>Oletko varma että haluat poistaa tämän inventoinnin?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Jos poistopyyntö hyväksytään, inventointi poistetaan pysyvästi.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Älä poista
					</Button>
					<Button variant="danger" onClick={handleSubmit}>
						Poista
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	)
}

export default DeleteInventoryForm
