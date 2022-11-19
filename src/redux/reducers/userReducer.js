import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'userDetails',
	initialState: JSON.parse(localStorage.getItem('userDetails')),
	reducers: {
		setUserDetails: (state, action) => {
			return action.payload
		}
	},
})

export const login = data => {
	return async dispatch => {
		localStorage.setItem('userDetails', JSON.stringify(data))
		dispatch(setUserDetails(data))
	}
}

export const logout = () => {
	return async dispatch => {
		localStorage.removeItem('userDetails')
		dispatch(setUserDetails(null))
	}
}

export const selectAdminStatus = (state) => {
	if (!state.userDetails) return 0
	return state.userDetails.user.admin
}

export const { setUserDetails } = userSlice.actions
export default userSlice.reducer
