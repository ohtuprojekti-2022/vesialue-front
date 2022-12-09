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
	const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/register`, {
		username,
		password,
		email,
		phone,
		name,
	})
	return request.data
}

export const loginRequest = async (username, password) => {
	const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/login`, {
		username,
		password,
	})
	return request.data
}

export const setAdmin = async (username, admin_value) => {
	const request = await axios.post(
		`${REACT_APP_BACKEND_URL}/api/user/admin`,
		{
			username,
			admin_value,
		},
		headers()
	)
	return request.data
}

export const userEditRequest = async (name, email, phone, username) => {
	const request = await axios.put(
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
}

export const passwordEditRequest = async (current_password, new_password) => {
	const request = await axios.post(
		`${REACT_APP_BACKEND_URL}/api/user/edit-password`,
		{
			current_password,
			new_password,
		},
		headers()
	)
	return request.data
}
export default { registerNewUser, loginRequest, setAdmin, userEditRequest, passwordEditRequest }
