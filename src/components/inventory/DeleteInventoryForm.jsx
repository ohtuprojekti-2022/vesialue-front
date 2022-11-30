import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectInventoryById } from '../../redux/reducers/inventoryReducer'
import { requestDelete } from '../../services/inventory-service'
import { appendDeletedInventories } from '../../redux/reducers/deletedInventoryReducer'

const DeleteInventoryForm = () => {
	let { id } = useParams()
	const [deleteReason, setDeleteReason] = useState('')
	const [report] = useSelector(state => {
		return [selectInventoryById(state, id)]
	})
	const dispatch = useDispatch()
	const [validated, setValidated] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		const confirmed = window.confirm(
			'Oletko varma että haluat poistaa tämän inventoinnin?'
		)
		if (confirmed) {
			try {
				setValidated(true)

				const result = await requestDelete(deleteReason, report.id)

				dispatch(appendDeletedInventories(result))

				navigate(`/report/${report.id}`)
			} catch (error) {
				console.log('deletion request failed')
			}
		}
	}

	return (
		<Form
			style={{ marginTop: '1rem', marginBottom: '1rem' }}
			noValidate
			validated={validated}
			onSubmit={handleSubmit}
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
	)
}

export default DeleteInventoryForm
