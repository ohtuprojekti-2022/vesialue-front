import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Frontpage from './Frontpage'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../utils/test-tools'
import store from '../redux/store'
import { login } from '../redux/reducers/userReducer'
import { appendInventory } from '../redux/reducers/inventoryReducer'
import { appendAreas } from '../redux/reducers/areaReducer'
import userEvent from '@testing-library/user-event'

const user1 = {'auth':'xyz', 
	'user':{'id':'u1', 
		'name':'Miko', 
		'email':'malliton@email.fi', 
		'phone':'+358748573829', 
		'username':'miko1', 
		'admin':'0'}
}

const inventory1 = {'id': '1',
	'inventorydate': '2022-01-01',
	'method': 'echo',
	'visibility': 'good',
	'moreInfo': 'listaus on kivaa',
	'user': {'id':'u1', 'name': 'Miko'},
	'city': 'Utsjoki'
}

const areas1 = [{'inventoryId': '1', 'id':'a1',
	'coordinates': [{lat: 60.13918005, lng: 24.92832183},
		{lat: 60.140376, lng: 24.984626770},
		{lat: 60.172837, lng: 24.99938}]}]

const user2 = {'auth':'zyx', 
	'user':{'id':'u2', 
		'name':'Mako', 
		'email':'mallillinen@email.fi', 
		'phone':'+358000000000', 
		'username':'mako2', 
		'admin':'0'}
}

const inventory2 = {'id': '2',
	'inventorydate': '2000-01-01',
	'method': 'dive',
	'visibility': 'bad',
	'moreInfo': 'listaus on tylsää',
	'user': {'id':'u2', 'name': 'Mako'},
	'city': 'Maarianhamina'
}
	
const areas2 = [{'inventoryId': '2', 'id':'a2',
	'coordinates': [{lat: 30.13918005, lng: 14.92832183},
		{lat: 30.140376, lng: 14.984626770},
		{lat: 30.172837, lng: 14.99938}]}]

store.dispatch(login(user1))
store.dispatch(appendInventory(inventory1))
store.dispatch(appendAreas(areas1))
store.dispatch(login(user2))
store.dispatch(appendInventory(inventory2))
store.dispatch(appendAreas(areas2))


describe('Frontpage', () => {
    
	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<Frontpage />
			</MemoryRouter>
		)
	})

	test('shows map on screen', () => {
		expect(screen.getByText('Leaflet')).not.toBeNull()
	})

	test('shows filterform on screen', () => {
		expect(screen.getByText('Suodata raportteja')).not.toBeNull()
	})

	test('shows inventorylist on screen', () => {
		expect(screen.getByText('Inventoinnin päivämäärä')).not.toBeNull()
	})

	test('correct reports are shown after filtering by city', async () => {
		const city = screen.getByLabelText('Kaupunki')
		const user = userEvent.setup()
		await user.type(city, 'Maar')
		expect(screen.getByText('Maarianhamina')).not.toBeNull()
		expect(screen.queryByText('Utsjoki')).not.toBeInTheDocument()
	})

})
