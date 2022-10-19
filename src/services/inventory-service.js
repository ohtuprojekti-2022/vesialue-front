import axios from 'axios'
import REACT_APP_BACKEND_URL from '../utils/config'
import { headers } from '../utils/tools'

export const addInventory = async (
	areas,
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

	const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/inventory`, {
		areas,
		inventorydate,
		method,
		visibility,
		methodInfo,
		attachments,
		name,
		email,
		phone,
		moreInfo,
	}, headers())
	return request.data
}

export const getInventory = async (id) => {
	const request = axios.get(`${REACT_APP_BACKEND_URL}/api/inventory/${id}`)
	return request.then((response) => response.data)
}

export const getAllAreas = async () => {
	const request = await axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/areas`
	)
	return request.data
}

export const getAllInventories = () => {
	const request = axios.get(`${REACT_APP_BACKEND_URL}/api/inventory`)
	return request.then((response) => response.data)
}

export const getInventoryById = async (inventoryId) => {
	const request = await axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/${inventoryId}`
	)
	return request.data
}

export default {
	addInventory,
	getInventory,
	getAllAreas,
	getAllInventories,
	getInventoryById,
}
