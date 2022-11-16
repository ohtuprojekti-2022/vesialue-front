import axios from 'axios'
import REACT_APP_BACKEND_URL from '../utils/config'

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
	const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/user/admin`, {
		username,
		admin_value,
	})
	return request.data
}

export const userEditRequest = async (name, email, phone, username) => {
	const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/user/edit`, {
		name,
		phone,
		email,
		username,
	})
	return request.data
}

export const passwordEditRequest = async (username, current_password, new_password) => {
	const request = await axios.post(`${REACT_APP_BACKEND_URL}/api/user/edit-password`, {
		username,
		current_password,
		new_password,
	})
	return request.data
}
export default { registerNewUser, loginRequest, setAdmin, userEditRequest, passwordEditRequest }
