import Button from 'react-bootstrap/Button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { initializeEditedInventories } from '../../redux/reducers/editedInventoryReducer'
import { rejectEditById } from '../../services/inventory-service'

const ApproveButton = ({ id }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleClick = async () => {
		try{
			const result = await rejectEditById(id)
			dispatch(initializeEditedInventories())
			if (result) {
				navigate('/muokatut')
			}
			
		} catch (error) {
			console.log(error)
		}
		
	}
	return(
		<Button variant='danger' style={{marginLeft:'0.5rem'}} onClick={handleClick}>
            Hylkää
		</Button>
	)
}

export default ApproveButton