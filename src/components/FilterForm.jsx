import React, {useEffect} from 'react'
import {
	Accordion,
	Button,
	Col,
	FloatingLabel,
	Form,
	Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilter, resetFilter } from '../redux/reducers/filterReducer'
import SortButton from './inventory/SortButton'

const FilterForm = () => {
	const filter = useSelector(({ filter }) => filter)
	const dispatch = useDispatch()

	const handleReset = () => {
		dispatch(resetFilter())
		document.getElementById('filter-form').reset()
	}

	const handleFilter = (e) => {
		if (e.target.value || e.target.type !== 'date') {
			dispatch(updateFilter({ id: e.target.id, value: e.target.value }))
		}
	}

	useEffect(() => {
		handleReset()
	}, [])

	return (
		<Accordion style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
			<Accordion.Item eventKey="0">
				<Accordion.Header>Suodata raportteja</Accordion.Header>
				<Accordion.Body>
					<Form id='filter-form' data-testid="filterform">
						<Button
							className="mb-3"
							variant="outline-primary"
							size="sm"
							onClick={handleReset}
						>
							Tyhjennä suodatin
						</Button>
						<Row className="mb-3">
							<Col>
								<FloatingLabel controlId="creator" label="Tekijä">
									<Form.Control
										type="text"
										onChange={handleFilter} />
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel controlId="city" label="Kaupunki">
									<Form.Control
										type="text"
										onChange={handleFilter} />
								</FloatingLabel>
							</Col>
						</Row>
						<Form.Group as={Row} className="mb-3" controlId="dateRange">
							<Form.Label>Aikaväli:</Form.Label>
							<Col>
								<FloatingLabel controlId="startDate" label="ensimmäinen päivä">
									<Form.Control
										type="date"
										onChange={handleFilter}
									/>
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel controlId="endDate" label="viimeinen päivä">
									<Form.Control
										type="date"
										value={new Date(filter.endDate).toISOString().split('T')[0]}
										onChange={handleFilter}
									/>
								</FloatingLabel>
							</Col>
						</Form.Group>
						<Row className="mb-3">
							<Form.Group as={Col} className="mb-3">
								<Form.Label>Havainnon tyyppi:</Form.Label>
								<Form.Select id="method" onChange={handleFilter}>
									<option>-</option>
									<option>Näköhavainto</option>
									<option>Viistokaiutus</option>
									<option>Sukellus</option>
								</Form.Select>
							</Form.Group>
							<Form.Group as={Col} className="mb-3">
								<Form.Label as={Row} style={{marginLeft: 3}}>Järjestys:</Form.Label>
								<SortButton handleSort={handleFilter} />
							</Form.Group>
						</Row>
						<hr></hr>
						<Row>
							<Form.Group>
								<FloatingLabel controlId="search" label="Vapaa haku">
									<Form.Control type="text" onChange={handleFilter} />
								</FloatingLabel>
							</Form.Group>
						</Row>
					</Form>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	)
}

export default FilterForm
