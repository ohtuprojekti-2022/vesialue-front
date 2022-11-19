import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Table } from 'react-bootstrap'
import EditedInventoryListItem from './EditedInventoryItem'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeEditedInventories } from '../../redux/reducers/editedInventoryReducer'


const EditedReportList = () => {
	const editedInventories = useSelector((state) => {
		return state.editedInventories
	})
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeEditedInventories())
	}, [dispatch])

	return (
		<Container>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>Inventoinnin päivämäärä</th>
						<th>Tekijä</th>
						<th>Muokkauksen syy</th>
					</tr>
				</thead>
				<tbody>
					{editedInventories.map(report => (
						<EditedInventoryListItem
							key={report.id}
							report={report}
						/>
					))}
				</tbody>
			</Table>
		</Container>
		
	)
}

export default EditedReportList