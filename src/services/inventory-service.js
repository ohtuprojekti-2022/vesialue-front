import axios from 'axios'
import REACT_APP_BACKEND_URL from '../utils/config'

export const addInventory = async (
	coordinates,
	inventorydate,
	method,
	visibility,
	methodInfo,
	attachments,
	name,
	email,
	phone,
	moreInfo
) => {

	const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/inventory/`, {
		coordinates,
		inventorydate,
		method,
		visibility,
		methodInfo,
		attachments,
		name,
		email,
		phone,
		moreInfo,
	})
	return request.data
}

export const getInventory = async (id) => {
	const request = axios.get(`${REACT_APP_BACKEND_URL}/api/inventory/${id}`)
	return request.then(response => response.data)
}

export const getAllAreas = async () => {
	const request = await axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/areas/`
	)
	return request.data
}

export default { addInventory, getInventory, getAllAreas }
