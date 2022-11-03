import React from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilter, resetFilter } from '../redux/reducers/filterReducer'

const FilterForm = () => {
	const filter = useSelector(({ filter }) => filter)
	const dispatch = useDispatch()

	const handleFilter = e => {
		if (e.target.value) {
			dispatch(updateFilter({ id: e.target.id, value: e.target.value }))
		}
	}
	return (
		<>
			<Form style={{ paddingTop: '0.5rem' }} onSubmit={e => e.preventDefault()}>
				<Row className="mb-3">
					<Col>
						<Form.Label style={{ fontSize: 22 }}>
							Filtteröi raportteja:
						</Form.Label>
					</Col>
					<Col>
						<Button
							variant="outline-primary"
							size="sm"
							onClick={() => dispatch(resetFilter())}
						>
							Tyhjennä filtteri
						</Button>
					</Col>
				</Row>
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
							<Form.Control
								type="date"
								defaultValue={
									new Date(filter.startDate).toISOString().split('T')[0]
								}
								onChange={handleFilter}
							/>
						</FloatingLabel>
					</Col>
					<Col>
						<FloatingLabel controlId="endDate" label="viimeinen päivä">
							<Form.Control
								type="date"
								defaultValue={
									new Date(filter.endDate).toISOString().split('T')[0]
								}
								onChange={handleFilter}
							/>
						</FloatingLabel>
					</Col>
				</Form.Group>
			</Form>
		</>
	)
}

export default FilterForm
