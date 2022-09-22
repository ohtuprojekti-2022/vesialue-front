import axios from 'axios'
import REACT_APP_BACKEND_URL from '../utils/config'

export const addInventory = async (
	coordinates,
	inventorydate,
	attachments,
	method,
	name,
	email,
	phone,
	other
) => {
	console.log({
		coordinates,
		inventorydate,
		attachments,
		method,
		name,
		email,
		phone,
		other
	})
	const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/add_inventory/`, {
		coordinates,
		inventorydate,
		attachments,
		method,
		name,
		email,
		phone,
		other
	})
	return request.data
}

export default { addInventory }
