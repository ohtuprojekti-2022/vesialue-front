import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from './reducers/inventoryReducer'
import areaReducer from './reducers/areaReducer'
import userReducer from './reducers/userReducer'
import filterReducer from './reducers/filterReducer'

export default configureStore({
	reducer: {
		inventories: inventoryReducer,
		areas: areaReducer,
		userDetails: userReducer,
		filter: filterReducer
	},
})
