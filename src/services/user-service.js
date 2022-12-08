import axios from 'axios'
import REACT_APP_BACKEND_URL from '../utils/config'
import { headers } from '../utils/tools'

export const registerNewUser = async (
	username,
	password,
	email,
	phone,
	name
) => {
	try {const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/register`, {
		username,
		password,
		email,
		phone,
		name,
	})
	return request.data
	} catch (error) {
		return null
	}
}

export const loginRequest = async (username, password) => {
	try {const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/login`, {
		username,
		password,
	})
	return request.data
	} catch (error) {
		return null
	}
}

export const setAdmin = async (username, admin_value) => {
	try {const request = await axios.post(
		`${REACT_APP_BACKEND_URL}/api/user/admin`,
		{
			username,
			admin_value,
		},
		headers()
	)
	return request.data
	} catch (error) {
		return null
	}
}

export const userEditRequest = async (name, email, phone, username) => {
	try {const request = await axios.put(
		`${REACT_APP_BACKEND_URL}/api/user/edit`,
		{
			name,
			phone,
			email,
			username,
		},
		headers()
	)
	return request.data
	} catch (error) {
		return null
	}
}

export const passwordEditRequest = async (username, current_password, new_password) => {
	try {const request = await axios.post(
		`${REACT_APP_BACKEND_URL}/api/user/edit-password`,
		{
			current_password,
			new_password,
		},
		headers()
	)
	return request.data
	} catch (error) {
		return null
	}
}
export default { registerNewUser, loginRequest, setAdmin, userEditRequest, passwordEditRequest }
