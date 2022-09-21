import axios from 'axios'
import REACT_APP_BACKEND_URL from '../utils/config'

export const addInventory = async (
	coordinates,
	time,
	attachments,
	methods,
	name,
	email,
	phonenumber,
	other
) => {
	console.log({
		coordinates,
		time,
		attachments,
		methods,
		name,
		email,
		phonenumber,
		other
	})
	const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/add_inventory/`, {
		coordinates,
		time,
		attachments,
		methods,
		name,
		email,
		phonenumber,
		other
	})
	return request.data
}

export default { addInventory }
