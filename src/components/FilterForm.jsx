import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilter } from '../redux/reducers/filterReducer'

const FilterForm = () => {
	const filter = useSelector(({ filter }) => filter)
	const dispatch = useDispatch()

	const handleFilter = e => {
		dispatch(updateFilter({ id: e.target.id, value: e.target.value }))
	}
	return (
		<>
			<h2 className="m-1" style={{ fontSize: 24 }}>
				Filtteröi raportteja:
			</h2>
			<Form onSubmit={e => e.preventDefault()}>
				<FloatingLabel
					controlId="creator"
					label="Tekijä"
					className="mb-3"
				>
					<Form.Control
						type="text"
						value={filter.name}
						onChange={handleFilter}
					/>
				</FloatingLabel>
			</Form>
		</>
	)
}

export default FilterForm
