import axios from 'axios'
import BACKEND_URL from '../utils/config'

export const registerNewUser = async (
	username,
	password,
	email,
	phone,
	name
) => {
	console.log({
		username,
		password,
		email,
		phone,
		name,
	})
	const request = await axios.post(`${BACKEND_URL}/api/register/`, {
		username,
		password,
		email,
		phone,
		name,
	})
	console.log(request.data)
}

export default { registerNewUser }
