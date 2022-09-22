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
	console.log({
		coordinates,
		inventorydate,
		attachments,
		method,
		name,
		email,
		phone,
		moreInfo
	})
	const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/add_inventory/`, {
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
	})
	return request.data
}

export default { addInventory }
