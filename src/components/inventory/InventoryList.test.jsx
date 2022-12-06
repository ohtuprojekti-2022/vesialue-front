import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import InventoryList from './InventoryList'
import { renderWithProviders } from '../../utils/test-tools'
import store from '../../redux/store'
import { login } from '../../redux/reducers/userReducer'
import { appendInventory } from '../../redux/reducers/inventoryReducer'
import { appendAreas } from '../../redux/reducers/areaReducer'

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

describe('InventoryList no reports', () => {

	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<InventoryList data={[]}/>
			</MemoryRouter>
		)	
	})

	test('Does not render table if the list is empty', () => {
		expect(screen.getByText('Ei tuloksia')).not.toBeNull()
	})

})

describe('InventoryList with reports', () => {
	let inventoryList
	
	const areas2 = [{'inventoryId': '2', 'id':'a2',
		'coordinates': [{lat: 30.13918005, lng: 14.92832183},
			{lat: 30.140376, lng: 14.984626770},
			{lat: 30.172837, lng: 14.99938}]}]

	const inventories = [inventory1, inventory2]

	beforeEach(() => {
		store.dispatch(login(user1))
		store.dispatch(appendInventory(inventory1))
		store.dispatch(appendAreas(areas1))
		store.dispatch(login(user2))
		store.dispatch(appendInventory(inventory2))
		store.dispatch(appendAreas(areas2))
		renderWithProviders(
			<MemoryRouter>
				<InventoryList data={inventories}/>
			</MemoryRouter>
		)
		inventoryList = screen.getByRole('table')
	})

	test('Renders all the reports when filter not selected', () => {
		expect(inventoryList).toBeDefined()
		expect(screen.getByText('Miko')).not.toBeNull()
		expect(screen.getByText('Mako')).not.toBeNull()
		expect(screen.getByText('Utsjoki')).not.toBeNull()
		expect(screen.getByText('Maarianhamina')).not.toBeNull()
		expect(screen.getByText('01.01.2022')).not.toBeNull()
		expect(screen.getByText('01.01.2000')).not.toBeNull()
	})

})
