import axios from 'axios'
import REACT_APP_BACKEND_URL from '../utils/config'
import { headers } from '../utils/tools'

export const uploadAttachment = async (formData) => {
	const { Authorization } = headers().headers
	const response = await axios({
		method: 'post',
		url: `${REACT_APP_BACKEND_URL}/api/files/upload`,
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': Authorization
		},
	})
	return response.data
}

export const deleteAttachment = async (attachmentId) => {
	const response = await axios.delete(
		`${REACT_APP_BACKEND_URL}/api/files/${attachmentId}`,
		headers()
	)
	return response.data
}

export default {
	uploadAttachment,
	deleteAttachment
}