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
			action.payload.forEach((area) => {
				state.push(area)
			})
		},
	},
})

export const initializeAreas = () => {
	return async (dispatch) => {
		const areas = await getAllAreas()
		dispatch(setAreas(areas))
	}
}

export const selectAreasByReportId = (state, id) =>
	state.areas.filter((a) => a.inventoryId === id)

export const { setAreas, appendAreas } = areaSlice.actions
export default areaSlice.reducer

/**
	const areas = allAreas.filter((a) =>
		report ? a.inventoryId === report.id : false
	) */
