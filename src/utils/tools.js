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

export const formatDate = (date) => {
	return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(
		0,
		4
	)}`
}
