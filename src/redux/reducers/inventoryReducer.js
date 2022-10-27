import { createSlice } from '@reduxjs/toolkit'
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
		}
	},
})

export const initializeInventories = () => {
	return async dispatch => {
		const inventories = await getAllInventories()
		dispatch(setInventories(inventories))
	}
}

/* export const createInventory = inventoryDetails => {
	return async dispatch => {
		const newInventory = await addInventory(inventoryDetails)
		dispatch(appendInventory(newInventory))
	}
} */

export const { setInventories, appendInventory } = inventorySlice.actions
export default inventorySlice.reducer
