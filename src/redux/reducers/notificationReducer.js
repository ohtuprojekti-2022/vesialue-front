import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		spinner: false,
		message: ''
	},
	reducers: {
		setNotification: (_state, action) => {
			return action.payload
		}
	},
})

export const resetNotification = () => {
	return dispatch => {
		dispatch(setNotification(notificationSlice.getInitialState()))
	}
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
