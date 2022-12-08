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
	try {
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
	} catch (error) {
		return null
	}
}

export const getInventory = async id => {
	try {const request = axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/${id}`,
		headers()
	)
	return request.then(response => response.data)
	} catch (error) {
		return null
	}
}

export const getAllAreas = async () => {
	try {
		const request = await axios.get(
			`${REACT_APP_BACKEND_URL}/api/inventory/areas`
		)
		return request.data
	} catch (error) {
		return [[], []]
	}
}

export const getAllInventories = () => {
	try {
		const request = axios.get(
			`${REACT_APP_BACKEND_URL}/api/inventory`,
			headers()
		)
		return request.then(response => response.data)
	} catch (error) {
		return [[], []]
	}
}

export const getInventoryById = async inventoryId => {
	try {
		const request = await axios.get(
			`${REACT_APP_BACKEND_URL}/api/inventory/${inventoryId}`
		)
		return request.data
	} catch (error) {
		return null
	}
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
	try {
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
				originalReport,
			},
			headers()
		)
		return request.data
	} catch (error) {
		return null
	}
}

export const getAllEditedInventories = async () => {
	const auth = headers()
	if (!auth.headers || !auth.headers.Authorization) return []
	try {const request = axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/edit`,
		auth
	)
	return request
		.then(response => response.data)
		.catch(error => {
			console.log(error)
			return []
		})
	} catch (error) {
		return []
	}
}

export const getEditedInventoryById = async inventoryId => {
	try {
		const request = await axios.get(
			`${REACT_APP_BACKEND_URL}/api/inventory/edit/${inventoryId}`
		)
		return request.then(response => response.data)
	} catch (error) {
		return null
	}
}

export const rejectEditById = async id => {
	await axios.delete(
		`${REACT_APP_BACKEND_URL}/api/inventory/edit/${id}`,
		headers()
	)
	return true
}

export const approveEditById = async id => {
	try {
		const request = await axios.put(
			`${REACT_APP_BACKEND_URL}/api/inventory/${id}`,
			{},
			headers()
		)
		return request.data
	} catch (error) {
		return null
	}
}

export const requestDelete = async (
	reason,
	inventory
) => {
	try {
		const request = await axios.post(
			`${REACT_APP_BACKEND_URL}/api/inventory/delete`,
			{
				reason,
				inventory
			},
			headers()
		)
		return request.data
	} catch (error) {
		return null
	}
}

export const getAllDeletedInventories = () => {
	const auth = headers()
	try {if (!auth.headers || !auth.headers.Authorization) return []
	const request = axios.get(
		`${REACT_APP_BACKEND_URL}/api/inventory/delete`,
		auth
	)
	return request
		.then(response => response.data)
		.catch(error => {
			console.log(error)
			return []
		})
	} catch (error) {
		return []
	}
}

export const getDeletedInventoryById = async inventoryId => {
	try {
		const request = await axios.get(
			`${REACT_APP_BACKEND_URL}/api/inventory/delete/${inventoryId}`
		)
		return request.then(response => response.data)
	} catch (error) {
		return null
	}
}

export const deleteInventoryById = async id => {
	await axios.delete(
		`${REACT_APP_BACKEND_URL}/api/inventory/${id}`,
		headers()
	)
	return true
}

export const rejectDeletionById = async id => {
	await axios.delete(
		`${REACT_APP_BACKEND_URL}/api/inventory/delete/${id}`,
		headers()
	)
	return true
}

export default {
	addInventory,
	getInventory,
	getAllAreas,
	getAllInventories,
	getInventoryById,
	requestEdit,
	getAllEditedInventories,
	getEditedInventoryById,
	rejectEditById,
	approveEditById,
	requestDelete,
	getAllDeletedInventories,
	getDeletedInventoryById,
	deleteInventoryById,
	rejectDeletionById
}
