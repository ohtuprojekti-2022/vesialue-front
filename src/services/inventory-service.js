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
	const request = await axios.post(
		`${REACT_APP_BACKEND_URL}/api/inventory`,
		{
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
		},
		headers()
	)
	return request.data
}

export const getInventory = async (id) => {
	const request = axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/${id}`,
		headers()
	)
	return request.then((response) => response.data)
}

export const getAllAreas = async () => {
	const request = await axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/areas`
	)
	return request.data
}

export const getAllInventories = () => {
	try {
		const request = axios.get(`${REACT_APP_BACKEND_URL}/api/inventory`, headers())
		return request.then((response) => response.data)
	} catch (error) {
		console.log(error)
	}
}

export const getInventoryById = async (inventoryId) => {
	const request = await axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/${inventoryId}`
	)
	return request.data
}

export const requestEdit = async (
	areas,
	inventorydate,
	method,
	methodInfo,
	visibility,
	attachments,
	moreInfo,
	editReason,
	originalReport
) => {
	const request = await axios.post(
		`${REACT_APP_BACKEND_URL}/api/inventory/edit`,
		{
			areas,
			inventorydate,
			method,
			methodInfo,
			visibility,
			attachments,
			moreInfo,
			editReason,
			originalReport
		},
		headers()
	)
	return request.data
}

export const getAllEditedInventories = () => {
	const request = axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/edit`, headers()
	)
	return request.then((response) => response.data)
}

export const getEditedInventoryById = async (inventoryId) => {
	const request = await axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/edit/${inventoryId}`
	)
	return request.then((response) => response.data)
}

export const rejectEditById = async (id) => {
	await axios.delete(
		`${REACT_APP_BACKEND_URL}/api/inventory/edit/${id}`,
		headers()
	)
	return true
}

export const approveEditById = async (id) => {
	const request= await axios.put(
		`${REACT_APP_BACKEND_URL}/api/inventory`,
		{id: id}, headers()
	)
	return request.data
}

export default {
	addInventory,
	getInventory,
	getAllAreas,
	getAllInventories,
	getInventoryById,
	rejectEditById,
}
