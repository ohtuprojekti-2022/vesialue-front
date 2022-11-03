import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filter',
	initialState: {
		creator: '',
		startDate: 0,
		endDate: Date.now(),
		method: '',
		city: '',
		moreInfo: '',
	},
	reducers: {
		updateFilter: (state, action) => {
			const value = action.payload.value.toLowerCase()
			switch (action.payload.id) {
			case 'creator':
				return { ...state, creator: value }
			case 'startDate':
				return { ...state, startDate: Date.parse(value) }
			case 'endDate':
				return { ...state, endDate: Date.parse(value) }
			case 'method':
				return { ...state, method: value }
			case 'city':
				return { ...state, city: value }
			case 'moreInfo':
				return { ...state, moreInfo: value }
			default:
				return state
			}
		},
	},
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer
