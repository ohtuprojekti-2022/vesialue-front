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
	moreInfo,
	user
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
		user
	})
	return request.data
}

export default { addInventory }
