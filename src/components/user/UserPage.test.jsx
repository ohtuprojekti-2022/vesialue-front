import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserPage from './UserPage'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-tools'
import store from '../../redux/store'
import { login } from '../../redux/reducers/userReducer'
import userEvent from '@testing-library/user-event'

const userDetails = {'auth':'xyz',
	'user':{'id':'ifbr2sa3mxdqrzgjo6nmw862', 'name':'Mikko',
		'email':'mikko@email.fi', 'phone':'0404040400',
		'username':'mikko1', 'admin':'0'}}

store.dispatch(login(userDetails))

describe('UserPage', () => {

	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<UserPage />
			</MemoryRouter>
		)
		
	})

    test('renders user details', () => {
        expect(screen.getByText('Käyttäjätiedot')).not.toBeNull
    })

    test('renders own inventories', () => {
        expect(screen.getByText('Omat inventoinnit')).not.toBeNull
    })

    test('opens useredit form when clicked', async () => {
		const button = screen.getByText('Käyttäjätiedot')
		const user = userEvent.setup()
		await user.click(button)
        expect(screen.getByText('Käyttäjänimi')).not.toBeNull
    })

    test('opens own inventories when clicked', async () => {
		const button = screen.getByText('Omat inventoinnit')
		const user = userEvent.setup()
		await user.click(button)
        expect(screen.getByText('Inventoinnin päivämäärä')).not.toBeNull
    })

})