import axios from 'axios'
import REACT_APP_BACKEND_URL from '../utils/config'

export const getCenter = (area) => {
	let maxLat = -Infinity
	let minLat = Infinity
	let maxLng = -Infinity
	let minLng = Infinity

	area.forEach((coordPair) => {
		maxLat = Math.max(maxLat, coordPair.lat)
		minLat = Math.min(minLat, coordPair.lat)
		maxLng = Math.max(maxLng, coordPair.lng)
		minLng = Math.min(minLng, coordPair.lng)
	})

	const lat = (maxLat + minLat) / 2
	const lng = (maxLng + minLng) / 2

	return { lat: lat, lng: lng }
}

export const getCity = async (areas) => {
	const centers = areas.map((area) => getCenter(area))
	const lat = centers[0].lat
	const lon = centers[0].lng

	const response = await axios.get(
		`${REACT_APP_BACKEND_URL}/api/cities?latitude=${lat}&longitude=${lon}`
	)

	return response.data.city
		? `${response.data.city}, ${response.data.locality}`
		: response.data.locality
}

export const translateMethod = (method, methodInfo) => {
	switch (method) {
	case 'sight':
		return 'Näköhavainto'
	case 'echo':
		return 'Viistokaiutus'
	case 'dive':
		return 'Sukellus'
	case 'other':
		return methodInfo
	}
}

export const translateVisibility = (visibility) => {
	switch (visibility) {
	case 'bad':
		return 'huono (alle 2m)'
	case 'normal':
		return 'normaali (2-5m)'
	case 'good':
		return 'hyvä (yli 5m)'
	}
}

export const formatDate = (date) => {
	return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(
		0,
		4
	)}`
}

export const parseCreator = (report) => {
	if (report.user) {
		return report.user.name ? report.user.name : report.user.email
	}
	return report.name ? report.name : report.email
}

export const headers = () => {
	const userDetails = JSON.parse(localStorage.getItem('userDetails'))
	return userDetails
		? {
			headers: {
				Authorization: `Bearer ${userDetails['auth']}`,
			},
		}
		: {}
}

export default { getCenter, getCity, translateMethod, formatDate, parseCreator }
