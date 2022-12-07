import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserPage from './UserPage'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-tools'
import store from '../../redux/store'
import { login } from '../../redux/reducers/userReducer'
import { appendInventory } from '../../redux/reducers/inventoryReducer'
import { appendAreas } from '../../redux/reducers/areaReducer'
import userEvent from '@testing-library/user-event'

const userDetails = {'auth':'xyz',
	'user':{'id':'u1', 'name':'Mikko',
		'email':'mikko@email.fi', 'phone':'0404040400',
		'username':'mikko1', 'admin':'0'}}

const inventory = {'id': '1',
	'inventorydate': '2022-01-01',
	'method': 'echo',
	'visibility': 'good',
	'moreInfo': 'listaus on kivaa',
	'user': {'id':'u1', 'name': 'Miko'},
	'city': 'Utsjoki'
}
	
const areas = [{'inventoryId': '1', 'id':'a1',
	'coordinates': [{lat: 60.13918005, lng: 24.92832183},
		{lat: 60.140376, lng: 24.984626770},
		{lat: 60.172837, lng: 24.99938}]}]

store.dispatch(login(userDetails))
store.dispatch(appendInventory(inventory))
store.dispatch(appendAreas(areas))

describe('UserPage', () => {

	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<UserPage />
			</MemoryRouter>
		)
		
	})

	test('renders user details', () => {
		expect(screen.getByText('Käyttäjätiedot')).not.toBeNull()
	})

	test('renders own inventories', () => {
		expect(screen.getByText('Omat inventoinnit')).not.toBeNull()
	})

	test('opens user details when clicked', async () => {
		const button = screen.getByText('Käyttäjätiedot')
		const user = userEvent.setup()
		await user.click(button)
		expect(screen.getByText('Käyttäjänimi')).not.toBeNull()
	})

	test('opens own inventories when clicked', async () => {
		const button = screen.getByText('Omat inventoinnit')
		const user = userEvent.setup()
		await user.click(button)
		expect(screen.getByText('Inventoinnin päivämäärä')).not.toBeNull()
	})

	test('edit button enables text fields', async () => {
		const button1 = screen.getByText('Käyttäjätiedot')
		const user = userEvent.setup()
		await user.click(button1)
		const button2 = screen.getByText('Muokkaa')
		await user.click(button2)
		expect(screen.getByLabelText('Käyttäjänimi')).not.toBeDisabled()
		expect(screen.getByLabelText('Etu- ja sukunimi')).not.toBeDisabled()
		expect(screen.getByLabelText('Sähköposti')).not.toBeDisabled()
		expect(screen.getByLabelText('Puhelinnumero')).not.toBeDisabled()
	})

	test('change password button opens password edit modal', async () => {
		const button1 = screen.getByText('Käyttäjätiedot')
		const user = userEvent.setup()
		await user.click(button1)
		const button2 = screen.getByText('Vaihda salasana')
		await user.click(button2)
		expect(screen.getByText('Nykyinen salasana')).not.toBeNull()
		expect(screen.getByText('Uusi salasana')).not.toBeNull()
		expect(screen.getByText('Salasana uudestaan')).not.toBeNull()
	})

})
