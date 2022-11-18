import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Map from '../map/Map'
import Area from '../map/Area'
import {
	getCenter,
	translateMethod,
	translateVisibility,
	attachmentsToString
} from '../../utils/tools'
import { Polygon } from 'react-leaflet'
import { selectEditedInventoryById } from '../../redux/reducers/editedInventoryReducer'
import { selectAreasByReportId } from '../../redux/reducers/areaReducer'
import { selectInventoryById } from '../../redux/reducers/inventoryReducer'
import Table from 'react-bootstrap/Table'

const EditedReport = () => {
	let { id } = useParams()
	const report = useSelector((state) => {
		return selectEditedInventoryById(state, id)
	})
	const originalId = report ? report.originalReport : ''
	const [areas, original] = useSelector((state) => {
		return [selectAreasByReportId(state, originalId), selectInventoryById(state, originalId)]
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
	console.log(report)
	console.log(areas)
	console.log(original)

	return(
		<>
			<Map center={center} >
				{newAreas && newAreas.map(area => (
					<Polygon key={'edited'+area.id} positions={area.coordinates.map((c)=>[c.lat, c.lng])} color='yellow'/>
				))}
				{areas.map(area => (
					<Area key={area.id} coordinates={area.coordinates} />
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
						<td><b>Päivämäärä</b></td>
						<td>{original.inventorydate}</td>
						<td>{report.inventorydate}</td>
					</tr>
					<tr>
						<td><b>Tapa</b></td>
						<td>{translateMethod(original.method, original.methodInfo)}</td>
						<td>{translateMethod(report.method, report.methodInfo)}</td>
					</tr>
					<tr>
						<td><b>Näkyvyys</b></td>
						<td>{translateVisibility(original.visibility)}</td>
						<td>{translateVisibility(report.visibility)}</td>
					</tr>
					<tr>
						<td><b>Liitetiedostoja</b></td>
						<td>{attachmentsToString(original.attachments)}</td>
						<td>{attachmentsToString(report.attachments)}</td>
					</tr>
					<tr>
						<td><b>Muuta tietoa</b></td>
						<td>{original.moreInfo}</td>
						<td>{report.moreInfo}</td>
					</tr>
					<tr>
						<td><b>Muokkauksen syy</b></td>
						<td>{report.editReason}</td>
					</tr>
				</tbody>
			</Table>


		</>
	)

}

export default EditedReport