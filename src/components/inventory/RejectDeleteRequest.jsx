import Button from 'react-bootstrap/Button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { rejectDeletionById } from '../../services/inventory-service'
import { removeDeletedInventoryById } from '../../redux/reducers/deletedInventoryReducer'
import { useNavigate } from 'react-router-dom'

const RejectDeletionButton = ({ id }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleClick = async () => {
		try {
			await rejectDeletionById(id)
			dispatch(removeDeletedInventoryById(id))
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Button variant="secondary" onClick={handleClick}>
			Hylkää poistopyyntö
		</Button>
	)
}

export default RejectDeletionButton
