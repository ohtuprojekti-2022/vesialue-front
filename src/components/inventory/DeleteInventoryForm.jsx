import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { selectAreasByReportId } from '../../redux/reducers/areaReducer'
import { selectInventoryById } from '../../redux/reducers/inventoryReducer'
import { requestDelete } from '../../services/inventory-service'


const DeleteInventoryForm = () => {
	let { id } = useParams()
	const [deleteReason, setDeleteReason] = useState('')
	const [report, areas, userId] = useSelector((state) => {
		return [
			selectInventoryById(state, id),
			selectAreasByReportId(state, id),
			state.userDetails.id,
		]
	})
	const dispatch = useDispatch()

	const [validated, setValidated] = useState(false)

	const handleSubmit = async () => {
		try {
			const result = await requestDelete(
				deleteReason,
				report.id
			)

			dispatch(appendDeletedInventories(result))

			navigate(`/report/${report.id}`)
		} catch (error) {
			addAlert(error.toString())
		}
	}

	return (
		<Form
			style={{ marginTop: '1rem', marginBottom: '1rem' }}
			noValidate
			validated={validated}
			onSubmit={handleSubmit}
		>
			<FloatingLabel controlId="deleteReason" label="Poiston syy" className="mb-3">
				<Form.Control
					data-testid="deleteReason"
					type="text"
					maxLength="500"
					defaultValue={deleteReason}
					onChange={(e) => setDeleteReason(e.target.value)}
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
