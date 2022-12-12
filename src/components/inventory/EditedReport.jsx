import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Map from '../map/Map'
import Area from '../map/Area'
import {
	getCenter,
	translateMethod,
	translateVisibility,
	attachmentsToString,
	formatDate,
} from '../../utils/tools'
import { Polygon } from 'react-leaflet'
import { selectEditedInventoryById } from '../../redux/reducers/editedInventoryReducer'
import { selectAreasByReportId } from '../../redux/reducers/areaReducer'
import { selectInventoryById } from '../../redux/reducers/inventoryReducer'
import { Table, Container } from 'react-bootstrap'
import ApproveButton from './ApproveButton'
import RejectButton from './RejectButton'
import { renderWithLineBreaks } from '../RenderLongText'

const EditedReport = () => {
	const userDetails = useSelector(({ userDetails }) => {
		return userDetails
	})
	let { id } = useParams()
	const report = useSelector((state) => {
		return selectEditedInventoryById(state, id)
	})
	const originalId = report ? report.originalReport : ''
	const [areas, original] = useSelector((state) => {
		return [
			selectAreasByReportId(state, originalId),
			selectInventoryById(state, originalId),
		]
	})
	if (!report || !areas || !original) {
		return <p>ladataan raporttia...</p>
	}
	const newAreas = report.areas
	const center = getCenter(
		areas.reduce((prev, current) => {
			return [...prev, getCenter(current.coordinates)]
		}, [])
	)

	return (
		<Container style={{ marginBottom: '0.5rem' }}>
			<Map center={center} autoZoom={true}>
				{areas.map((area) => (
					<Polygon
						key={area.id}
						positions={area.coordinates.map((c) => [c.lat, c.lng])}
						color="red"
					/>
				))}
				{newAreas &&
					newAreas.map((area) => (
						<Area key={'edited' + area.id} coordinates={area.coordinates} />
					))}
			</Map>
			<Table bordered responsive>
				<thead>
					<tr>
						<th></th>
						<th>Alkuperäinen</th>
						<th>Muokattu</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<b>Päivämäärä</b>
						</td>
						<td>{formatDate(original.inventorydate)}</td>
						<td>{formatDate(report.inventorydate)}</td>
					</tr>
					<tr>
						<td>
							<b>Tapa</b>
						</td>
						<td>{translateMethod(original.method, original.methodInfo)}</td>
						<td>{translateMethod(report.method, report.methodInfo)}</td>
					</tr>
					<tr>
						<td>
							<b>Näkyvyys</b>
						</td>
						<td>{translateVisibility(original.visibility)}</td>
						<td>{translateVisibility(report.visibility)}</td>
					</tr>
					<tr>
						<td>
							<b>Liitetiedostoja</b>
						</td>
						<td>{attachmentsToString(original.attachments)}</td>
						<td>{attachmentsToString(report.attachments)}</td>
					</tr>
					<tr>
						<td>
							<b>Kuvaus</b>
						</td>
						<td>
							{renderWithLineBreaks(original.moreInfo)}
						</td>
						<td>
							{renderWithLineBreaks(report.moreInfo)}
						</td>
					</tr>
					<tr>
						<td>
							<b>Muokkauksen syy</b>
						</td>
						<td colSpan="2">{report.editReason}</td>
					</tr>
				</tbody>
			</Table>
			{userDetails.user.admin > 0 &&
				<ApproveButton id={report.id} />}
			<RejectButton id={report.id} originalReportId={original.id} isAdmin={userDetails.user.admin > 0} />
		</Container>
	)
}

export default EditedReport
