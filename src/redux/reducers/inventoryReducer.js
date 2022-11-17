import { createSelector, createSlice } from '@reduxjs/toolkit'
import { getAllInventories } from '../../services/inventory-service'

const inventorySlice = createSlice({
	name: 'inventories',
	initialState: [],
	reducers: {
		setInventories: (_state, action) => {
			return action.payload
		},
		appendInventory: (state, action) => {
			state.push(action.payload)
		},
	},
})

export const initializeInventories = () => {
	return async (dispatch) => {
		const inventories = await getAllInventories()
		dispatch(setInventories(inventories))
	}
}

export const getInventoriesByUserId = createSelector(
	[(state) => state.inventories, (_state, userId) => userId],
	// Output selector gets (inventories, userId) as args
	(inventories, userId) =>
		inventories.filter(
			(inventory) => inventory.user && inventory.user.id === userId
		)
)

export const selectInventoryById = (state, id) =>
	state.inventories.find((i) => i.id === id)

export const { setInventories, appendInventory } = inventorySlice.actions
export default inventorySlice.reducer
