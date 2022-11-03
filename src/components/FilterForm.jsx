import React from 'react'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
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
			<Form onSubmit={e => e.preventDefault()}>
				<Form.Label style={{ fontSize: 22 }}>Filtteröi raportteja:</Form.Label>
				<Row className="mb-3">
					<Col>
						<FloatingLabel controlId="creator" label="Tekijä">
							<Form.Control
								type="text"
								value={filter.creator}
								onChange={handleFilter}
							/>
						</FloatingLabel>
					</Col>
				</Row>
				<Form.Group as={Row} className="mb-3" controlId="dateRange">
					<Form.Label>Aikaväli:</Form.Label>
					<Col>
						<FloatingLabel controlId="startDate" label="ensimmäinen päivä">
							<Form.Control type="date" onChange={handleFilter} />
						</FloatingLabel>
					</Col>
					<Col>
						<FloatingLabel controlId="endDate" label="viimeinen päivä">
							<Form.Control type="date" onChange={handleFilter} />
						</FloatingLabel>
					</Col>
				</Form.Group>
			</Form>
		</>
	)
}

export default FilterForm
