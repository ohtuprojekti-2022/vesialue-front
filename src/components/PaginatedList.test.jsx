import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PaginatedList from './PaginatedList'
import { renderWithProviders } from '../utils/test-tools'
import store from '../redux/store'
import { login } from '../redux/reducers/userReducer'
import { appendInventory } from '../redux/reducers/inventoryReducer'
import { appendAreas } from '../redux/reducers/areaReducer'

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
describe('PaginatedList not yet loaded', () => {

	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<PaginatedList data={[]}/>
			</MemoryRouter>
		)	
	})

	test('Does not render table if the list is empty', () => {
		expect(screen.getByText('Haetaan raportteja...')).not.toBeNull()
	})
})
