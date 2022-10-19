import React from 'react'
import Report from './Report'
import Table from 'react-bootstrap/Table'

const ReportList = ({ inventories }) => {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Inventoinnin päivämäärä</th>
					<th>Havainnon tyyppi</th>
					<th>Tekijä</th>
					<th>Kaupunki</th>
				</tr>
			</thead>
			<tbody>
				{inventories.map((report) => (
					<Report key={report.id} report={report} />
				))}
			</tbody>
		</Table>
	)
}

export default ReportList
