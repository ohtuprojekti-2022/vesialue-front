import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	userId: undefined,
	creator: '',
	startDate: undefined,
	endDate: Date.now(),
	method: '-',
	city: '',
	moreInfo: '',
	search: '',
	order: true
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		updateFilter: (state, action) => {
			const value = action.payload.value.toLowerCase()
			switch (action.payload.id) {
			case 'userId':
				return { ...state, userId: value }
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
			case 'search':
				return { ...state, search: value }
			case 'orderByDate':
				return {...state, order: !state.order}
			default:
				return state
			}
		},
		resetFilter: () => {
			return initialState
		}
	},
})

export const { updateFilter, resetFilter } = filterSlice.actions
export default filterSlice.reducer
