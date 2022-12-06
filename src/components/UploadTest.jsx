import React, { useState } from 'react'
import {Button, FloatingLabel, Form} from 'react-bootstrap'
import axios from 'axios'
import REACT_APP_BACKEND_URL from '../utils/config'

const UploadTest = () => {
	const [formFile, setFormFile] = useState(null)
	const handleSubmit = async(event) => {
		event.preventDefault()
		const formData = new FormData()
		formData.append('formFile', formFile)
		try {
			const response = await axios({
				method: 'post',
				url: `${REACT_APP_BACKEND_URL}/api/upload`,
				data: formData,
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			console.log(response)
		} catch(error) {
			console.log(error)
		}
	}
	const handleFileChange = (event) => {
		setFormFile(event.target.files[0])
	}
	return (
		<Form
			style={{ marginBottom: '0.25rem' }}
			data-testid="login-form"
			onSubmit={handleSubmit}
		>
			<FloatingLabel
				controlId="file"
				label="Liitetiedosto"
				className="mb-3"
			>
				<Form.Control
					type="file"
					required
					data-testid="attachment"
					onChange={event => handleFileChange(event)}
				/>
			</FloatingLabel>
			<Button variant="primary" type="submit">
                Upload
			</Button>
		</Form>
	)
}

export default UploadTest