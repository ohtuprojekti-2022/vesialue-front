import { createSlice } from '@reduxjs/toolkit'
import { getAllDeletedInventories } from '../../services/inventory-service'

const deletedInventorySlice = createSlice({
	name: 'deletedInventories',
	initialState: [],
	reducers: {
		setDeletedInventories: (_state, action) => {
			return action.payload
		},
		appendDeletedInventories: (state, action) => {
			return [...state, action.payload]
		},
		removeDeletedInventoryById: (state, action) => {
			return state.filter(i => i.id !== action.payload)
		},
		removeDeletedInventoryByInventory: (state, action) => {
			return state.filter(i => i.inventory !== action.payload)
		}
	},
})

export const initializeDeletedInventories = () => {
	return async (dispatch) => {
		const inventories = await getAllDeletedInventories()
		dispatch(setDeletedInventories(inventories))
	}
}

export const selectDeletedInventoryById = (state, id) => {
	return state.deletedInventories.find((i) => i.id === id)
}

export const selectDeletedInventoryByInventory = (state, inventory) => {
	return state.deletedInventories.find((i) => i.inventory === inventory)
}

export const { setDeletedInventories, appendDeletedInventories, removeDeletedInventoryById, removeDeletedInventoryByInventory } = deletedInventorySlice.actions
export default deletedInventorySlice.reducer