import { createSlice } from '@reduxjs/toolkit'
import { getAllEditedInventories } from '../../services/inventory-service'

const editedInventorySlice = createSlice({
	name: 'editedInventories',
	initialState: [],
	reducers: {
		setEditedInventories: (_state, action) => {
			return action.payload
		},
		appendEditedInventories: (state, action) => {
			return [...state, action.payload]
		},
		removeEditedInventoryById: (state, action) => {
			return state.filter((i) => i.id !== action.payload)
		},
		removeEditedInventoryByOriginalId: (state, action) => {
			return state.filter((i) => i.originalReport !== action.payload)
		},
		updateEditedInventories: (state, action) => {
			const editedInventories = state.filter(
				(editedInventory) =>
					editedInventory.originalReport !== action.payload.originalReport
			)
			return [...editedInventories, action.payload]
		},
	},
})

export const initializeEditedInventories = () => {
	return async (dispatch) => {
		const inventories = await getAllEditedInventories()
		dispatch(setEditedInventories(inventories))
	}
}

export const selectEditedInventoryById = (state, id) => {
	return state.editedInventories.find((i) => i.id === id)
}

export const selectEditedInventoryByOriginalId = (state, original) => {
	return state.editedInventories.find((i) => i.originalReport === original)
}

export const {
	setEditedInventories,
	appendEditedInventories,
	removeEditedInventoryById,
	removeEditedInventoryByOriginalId,
	updateEditedInventories
} = editedInventorySlice.actions
export default editedInventorySlice.reducer
