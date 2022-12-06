import axios from 'axios'
import REACT_APP_BACKEND_URL from '../utils/config'

export const uploadAttachment = async (formData) => {
	const response = await axios({
		method: 'post',
		url: `${REACT_APP_BACKEND_URL}/api/files/upload`,
		data: formData,
		headers: { 'Content-Type': 'multipart/form-data' },
	})
	return response.data
}

export default uploadAttachment