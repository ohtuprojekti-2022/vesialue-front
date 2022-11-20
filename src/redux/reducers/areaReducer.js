import { createSlice } from '@reduxjs/toolkit'
import { getAllAreas } from '../../services/inventory-service'

const areaSlice = createSlice({
	name: 'areas',
	initialState: [],
	reducers: {
		setAreas: (_state, action) => {
			return action.payload
		},
		appendAreas: (state, action) => {
			return [...state, ...action.payload]
		},
		removeAreas: (state, action) => {
			return state.filter((a) => a.inventoryId !== action.payload)
		},
	},
})

export const initializeAreas = () => {
	return async (dispatch) => {
		const areas = await getAllAreas()
		dispatch(setAreas(areas))
	}
}

export const updateAreas = (inventoryId, new_areas) => {
	return (dispatch) => {
		dispatch(removeAreas(inventoryId))
		dispatch(appendAreas(new_areas))
	}
}

export const selectAreasByReportId = (state, id) =>
	state.areas.filter((a) => a.inventoryId === id)

export const { setAreas, appendAreas, removeAreas } = areaSlice.actions
export default areaSlice.reducer

/**
	const areas = allAreas.filter((a) =>
		report ? a.inventoryId === report.id : false
	) */
