import { createSlice } from '@reduxjs/toolkit'
import { getAllInventories } from '../../services/inventory-service'

const inventorySlice = createSlice({
	name: 'inventories',
	initialState: [],
	reducers: {
		setInventories: (_state, action) => {
			return action.payload
		},
	},
})

export const initializeInventories = () => {
	return async (dispatch) => {
		const inventories = await getAllInventories()
		dispatch(setInventories(inventories))
	}
}

export const { setInventories } = inventorySlice.actions
export default inventorySlice.reducer
