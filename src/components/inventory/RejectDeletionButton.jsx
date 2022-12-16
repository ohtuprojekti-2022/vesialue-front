import Button from 'react-bootstrap/Button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { rejectDeletionById } from '../../services/inventory-service'
import { removeDeletedInventoryById } from '../../redux/reducers/deletedInventoryReducer'

/**
 * Button seen by admins that rejects a deletion request of a report
 */
const RejectDeletionButton = ({ id, isAdmin }) => {
	const dispatch = useDispatch()
	const handleClick = async () => {
		try {
			await rejectDeletionById(id)
			dispatch(removeDeletedInventoryById(id))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Button
			variant="secondary"
			onClick={handleClick}
			style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}
		>
			{isAdmin ?
				'Hylkää poistopyyntö':
				'Peruuta poistopyyntö'}
		</Button>
	)
}

export default RejectDeletionButton
