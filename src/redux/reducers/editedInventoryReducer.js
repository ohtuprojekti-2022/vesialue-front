import { createSlice } from '@reduxjs/toolkit'
import { getAllEditedInventories } from '../../services/inventory-service'

const editedInventorySlice = createSlice({
	name: 'editedInventories',
	initialState: [],
	reducers: {
		setInventories: (_state, action) => {
			return action.payload
		}
	},
})

export const initializeEditedInventories = () => {
	return async (dispatch) => {
		const inventories = await getAllEditedInventories()
		dispatch(setInventories(inventories))
	}
}

export const selectEditedInventoryById = (state, id) => {
	return state.editedInventories.find((i) => i.id === id)
}

export const { setInventories } = editedInventorySlice.actions
export default editedInventorySlice.reducer