import Button from 'react-bootstrap/Button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { rejectEditById } from '../../services/inventory-service'
import { removeEditedInventoryById } from '../../redux/reducers/editedInventoryReducer'

const RejectButton = ({ id, originalReportId, isAdmin }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleClick = async () => {
		try {
			await rejectEditById(id)
			dispatch(removeEditedInventoryById(id))
			isAdmin
				? navigate('/muokatut')
				: navigate(`/raportti/${originalReportId}`)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Button
			variant="danger"
			style={{ marginLeft: '0.5rem' }}
			onClick={handleClick}
		>{isAdmin &&
			'Hylkää'
			|| 'Peruuta muokkauspyyntö'}
		</Button>
	)
}

export default RejectButton
