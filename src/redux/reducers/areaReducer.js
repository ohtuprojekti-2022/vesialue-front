import { createSlice } from '@reduxjs/toolkit'
import { getAllAreas } from '../../services/inventory-service'

const areaSlice = createSlice({
	name: 'areas',
	initialState: [],
	reducers: {
		setAreas: (_state, action) => {
			return action.payload
		},
	},
})

export const initializeAreas = () => {
	return async (dispatch) => {
		const areas = await getAllAreas()
		dispatch(setAreas(areas))
	}
}

export const { setAreas } = areaSlice.actions
export default areaSlice.reducer
