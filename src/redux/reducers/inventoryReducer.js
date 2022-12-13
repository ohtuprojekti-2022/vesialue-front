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
		removeInventory: (state, action) => {
			return state.filter(i => i.id !== action.payload.id)
		},
		removeInventoryById: (state, action) => {
			return state.filter(i => i.id !== action.payload)
		},
		removeAttachmentById: (state, action) => {
			const inv = state.filter(i => i.id === action.payload.inventoryId)[0]
			return state.map(i => i.id === action.payload.inventoryId ?
				{ ...inv, attachment_files: inv.attachment_files.filter(a =>
					a.attachment !== action.payload.attachmentId
				)} : i)
		},
		addAttachments: (state, action) => {
			const inv = state.filter(i => i.id === action.payload.inventoryId)[0]
			return state.map(i => i.id === action.payload.inventoryId ?
				{ ...inv, attachment_files: action.payload.newAttachments } : i)
		}
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

export const updateInventories = (inventory) => {
	return (dispatch) => {
		dispatch(removeInventory(inventory))
		dispatch(appendInventory(inventory))
	}
}

export const selectInventoryById = (state, id) =>
	state.inventories.find((i) => i.id === id)

export const { setInventories, appendInventory, removeInventory, removeInventoryById, removeAttachmentById, addAttachments } =
	inventorySlice.actions
export default inventorySlice.reducer
