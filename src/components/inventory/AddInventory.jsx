/* istanbul ignore file */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Alert } from 'react-bootstrap'
import { addInventory } from '../../services/inventory-service'
import { uploadAttachment } from '../../services/attachment-service'
import InventoryForm from './InventoryForm'
import Map from '../map/Map'
import { useDispatch } from 'react-redux'
import { appendInventory } from '../../redux/reducers/inventoryReducer'
import { appendAreas } from '../../redux/reducers/areaReducer'
import { formatDate } from '../../utils/tools'
import MaptoolinfoModal from '../MaptoolinfoModal'

const AddInventory = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [inventorydate, setInventorydate] = useState('')
	const [attachments, setAttachments] = useState(false)
	const [method, setMethod] = useState('')
	const [visibility, setVisibility] = useState('')
	const [methodInfo, setMethodInfo] = useState('')
	const [moreInfo, setMoreInfo] = useState('')
	const [validated, setValidated] = useState(false)
	const [alert, setAlert] = useState(null)
	const [mapLayers, setMapLayers] = useState([])
	const [attachmentFiles, setAttachmentFiles] = useState(null)
	const navigate = useNavigate()
	const [showMTI, setShowMTI] = useState(false)

	const addAlert = (text) => {
		setAlert(text)
		setTimeout(() => {
			setAlert(null)
		}, 7500)
	}

	const dispatch = useDispatch()

	const confirmDate = () => {
		const invDate = Date.parse(inventorydate)
		const fiveYearsAgo = new Date().setFullYear(new Date().getFullYear() - 5)
		if (invDate < fiveYearsAgo) {
			return window.confirm(`Asettamasi ajankohta on yli viisi vuotta sitten. Onko ajankohta ${formatDate(inventorydate)} oikein?`)
		}
		return true
	}

	const handleSubmit = async (event) => {
		const form = event.currentTarget
		const valid = form.checkValidity()
		setValidated(true)
		event.preventDefault()
		if (valid && confirmDate()) {
			try {
				const [inventory, areas] = await addInventory(
					mapLayers.map((layer) => layer.latlngs),
					inventorydate,
					method,
					visibility,
					methodInfo,
					attachments,
					name,
					email,
					phone,
					moreInfo
				)

				// attachment upload
				if (attachments) {
					const formData = new FormData()
					for (let i = 0; i < attachmentFiles.length; i++) {
						formData.append('file', attachmentFiles[i])
					}
					formData.append('inventory', inventory.id)
					try {
						await uploadAttachment(formData)
					} catch(error) {
						console.log(error)
					}
				}

				dispatch(appendInventory(inventory))
				dispatch(appendAreas(areas))

				setInventorydate('')
				setMethod('')
				setAttachments('')
				setName('')
				setEmail('')
				setPhone('')
				setMoreInfo('')
				setValidated(false)
				navigate(`/raportti/${inventory.id}`)
			} catch (error) {
				addAlert(error.toString())
			}
		}
	}

	return (
		<Container fluid="sm">
			<h2>Lisää inventointi 
				<button style={{backgroundColor: 'Transparent', border: 'none', float: 'right', paddingRight: '25px'}} 
					onClick={() => setShowMTI(true)}>
					<img src="/info-logo.png" width='28' height='28'></img>
				</button>
			</h2>
			{alert && <Alert variant="danger">{alert}</Alert>}
			<Map setMapLayers={setMapLayers} />
			<InventoryForm
				validated={validated}
				handleSubmit={handleSubmit}
				mapLayers={mapLayers}
				setInventorydate={setInventorydate}
				method={method}
				setMethod={setMethod}
				setVisibility={setVisibility}
				setMethodInfo={setMethodInfo}
				attachments={attachments}
				setAttachments={setAttachments}
				setMoreInfo={setMoreInfo}
				setName={setName}
				setEmail={setEmail}
				setPhone={setPhone}
				setAttachmentFiles={setAttachmentFiles}
			/>
			<MaptoolinfoModal
				show={showMTI}
				close={() => setShowMTI(false)}
			/>
		</Container>
	)
}

export default AddInventory
