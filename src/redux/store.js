import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from './reducers/inventoryReducer'

export default configureStore({
	reducer: {
		inventories: inventoryReducer,
	},
})
