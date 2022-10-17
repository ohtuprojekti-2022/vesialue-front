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
    
	return({lat: lat, lon: lng})
    
}

export const getCity = async (areas) => {
	const centers = areas.map((area) => getCenter(area))
	const lat = centers[0].lat
	const lon = centers[0].lon

	const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/cities?latitude=${lat}&longitude=${lon}`)
	console.log(response.data)

	return response.data.city?`${response.data.city}, ${response.data.locality}`:response.data.locality

	
}

export default getCity