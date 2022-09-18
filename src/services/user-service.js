import axios from 'axios'
import BACKEND_URL from '../utils/config'

export const loginRequest = async (
	username,
	password
) => {
	const request = await axios.post(`${BACKEND_URL}/api/login/`, {
		username,
		password
	})
	console.log(request.data)
}

export default { loginRequest }
