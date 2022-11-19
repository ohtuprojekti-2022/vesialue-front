import Button from 'react-bootstrap/Button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { approveEditById } from '../../services/inventory-service'
import { initializeEditedInventories } from '../../redux/reducers/editedInventoryReducer'

const ApproveButton = ({ id }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()


	const handleClick = async () => {
		try{
			const result = await approveEditById(id)
			dispatch(initializeEditedInventories())
			if (result) {
				navigate('/muokatut')
			}
		} catch (error) {
			console.log(error)
		}
	}
	return(
		<Button variant='primary' onClick={handleClick}>
            Hyväksy
		</Button>
	)
}

export default ApproveButton