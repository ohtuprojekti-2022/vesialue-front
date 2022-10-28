import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from './reducers/inventoryReducer'
import areaReducer from './reducers/areaReducer'

export default configureStore({
	reducer: {
		inventories: inventoryReducer,
		areas: areaReducer
	},
})
