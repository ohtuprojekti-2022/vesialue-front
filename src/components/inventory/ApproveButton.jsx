import Button from 'react-bootstrap/Button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { approveEditById } from '../../services/inventory-service'
import { updateAreas } from '../../redux/reducers/areaReducer'
import { updateInventories } from '../../redux/reducers/inventoryReducer'
import { removeEditedInventoryById } from '../../redux/reducers/editedInventoryReducer'

/**
 * Button for admins that approves an edit request for an inventory
 */
const ApproveButton = ({ id }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleClick = async () => {
		try {
			const [inventory, areas] = await approveEditById(id)

			dispatch(updateAreas(inventory.id, areas))
			dispatch(updateInventories(inventory))
			dispatch(removeEditedInventoryById(id))

			navigate('/muokatut')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Button variant="primary" onClick={handleClick}>
			Hyväksy
		</Button>
	)
}

export default ApproveButton
