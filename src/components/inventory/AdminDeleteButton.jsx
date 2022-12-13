import Button from 'react-bootstrap/Button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteInventoryById } from '../../services/inventory-service'
import { removeInventoryById } from '../../redux/reducers/inventoryReducer'
import { removeEditedInventoryByOriginalId } from '../../redux/reducers/editedInventoryReducer'
import { removeDeletedInventoryByInventory } from '../../redux/reducers/deletedInventoryReducer'

/**
 * Button seen by admins that deletes an inventory regardless of whether a deletion request was made or not
 */
const AdminDeleteButton = ({ id }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleClick = async () => {
		try {
			await deleteInventoryById(id)
			dispatch(removeInventoryById(id))
			dispatch(removeEditedInventoryByOriginalId(id))
			dispatch(removeDeletedInventoryByInventory(id))
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Button
			variant="danger"
			style={{ marginLeft: '0.5rem' }}
			onClick={handleClick}
			data-testid='admin-delete-button'
		>
			Poista
		</Button>
	)
}

export default AdminDeleteButton