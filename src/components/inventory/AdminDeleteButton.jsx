import Button from 'react-bootstrap/Button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteInventoryById } from '../../services/inventory-service'
import { removeInventoryById } from '../../redux/reducers/inventoryReducer'
import { removeEditedInventoryByOriginalId } from '../../redux/reducers/editedInventoryReducer'
import { removeDeletedInventoryById } from '../../redux/reducers/deletedInventoryReducer'


const AdminDeleteButton = ({ id }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleClick = async () => {
		try {
			await deleteInventoryById(id)
			dispatch(removeInventoryById(id))
			dispatch(removeEditedInventoryByOriginalId(id))
			dispatch(removeDeletedInventoryById(id))
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
		>
			Poista
		</Button>
	)
}

export default AdminDeleteButton