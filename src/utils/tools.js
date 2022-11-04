export const getCenter = coordinates => {
	let maxLat = -Infinity
	let minLat = Infinity
	let maxLng = -Infinity
	let minLng = Infinity

	coordinates.forEach(coordPair => {
		maxLat = Math.max(maxLat, coordPair.lat)
		minLat = Math.min(minLat, coordPair.lat)
		maxLng = Math.max(maxLng, coordPair.lng)
		minLng = Math.min(minLng, coordPair.lng)
	})

	const lat = (maxLat + minLat) / 2
	const lng = (maxLng + minLng) / 2

	return { lat: lat, lng: lng }
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

export const translateVisibility = visibility => {
	switch (visibility) {
	case 'bad':
		return 'huono (alle 2m)'
	case 'normal':
		return 'normaali (2-5m)'
	case 'good':
		return 'hyvä (yli 5m)'
	}
}

export const formatDate = date => {
	return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(
		0,
		4
	)}`
}

export const parseCreator = report => {
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

export const filteredInventoriesAndAreas = (inventories, areas, filter) => {
	const filteredInventories = inventories.filter(report => {
		const { user, city } = report
		const name = user ? user.name : report.name
		const username = user ? user.username : ''
		const inventoryDate = Date.parse(report.inventorydate)
		const method = translateMethod(report.method, report.methodInfo).toLowerCase()

		return (
			(name.toLowerCase().includes(filter.creator) ||
				username.toLowerCase().includes(filter.creator)) &&
			city.toLowerCase().includes(filter.city) &&
			(method === filter.method || filter.method === '-') &&
			filter.startDate <= inventoryDate &&
			inventoryDate <= filter.endDate
		)
	})
	const inventoryIds = new Set(filteredInventories.map(i => i.id))
	const filteredAreas = areas.filter(a => inventoryIds.has(a.inventoryId))
	return [filteredInventories, filteredAreas]
}
