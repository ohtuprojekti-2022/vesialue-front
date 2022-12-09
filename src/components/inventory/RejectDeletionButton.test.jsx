import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, useParams } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-tools'
import store from '../../redux/store'
import { login } from '../../redux/reducers/userReducer'
import { appendInventory } from '../../redux/reducers/inventoryReducer'
import { appendDeletedInventories } from '../../redux/reducers/deletedInventoryReducer'
import { appendAreas } from '../../redux/reducers/areaReducer'
import userEvent from '@testing-library/user-event'
import RejectDeletionButton from './RejectDeletionButton'
import InventoryReport from './InventoryReport'

jest.mock('axios')

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

const inventory2 = {'id': '2',
	'inventorydate': '2022-02-10',
	'method': 'echo',
	'visibility': 'good',
	'moreInfo': 'tähän pidempi teksti',
	'user': {'id':'u2'}
}

const areas2 = [{'inventoryId': '2', 'id':'a2',
	'coordinates':
		[{lat: 60.239180, lng: 24.82832183}, {lat: 60.240376, lng: 24.88462677}, {lat: 60.2728377, lng: 24.8993896}]},
{'inventoryId': '2', 'id':'a22',
	'coordinates':
		[{lat: 61.139180, lng: 25.928321}, {lat: 61.1403765, lng: 25.98462677}, {lat: 61.1728377, lng: 25.999384}]}]

const areas1 = [{'inventoryId': '1', 'id':'a1',
	'coordinates': [{lat: 60.13918005, lng: 24.92832183},
		{lat: 60.140376, lng: 24.984626770},
		{lat: 60.172837, lng: 24.99938}]}]

const deleteRequest = {'id': 'del1', 'user': user1['user'], 'inventory': '1', 'reason': 'spam'}

store.dispatch(login(user1))
store.dispatch(appendInventory(inventory1))
store.dispatch(appendAreas(areas1))
store.dispatch(appendInventory(inventory2))
store.dispatch(appendAreas(areas2))
store.dispatch(appendDeletedInventories(deleteRequest))


let button
describe('RejectDeletionButton user', () => {
	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<RejectDeletionButton id={'del1'} isAdmin={false}/>
			</MemoryRouter>
		)
		button = screen.getByText('Peruuta poistopyyntö')
	})

	test('button is defined', () => {
		expect(button).toBeDefined()
	})

	test('button is found on report page', ()=>{
		useParams.mockReturnValue({ id: '1' })
		renderWithProviders(
			<MemoryRouter>
				<InventoryReport />
			</MemoryRouter>
		)
		expect(button).toBeDefined()
	})

	test('deletion request notification disappears after rejecting delete request', async ()=>{
		const user = userEvent.setup()
		const consoleSpy = jest.spyOn(console, 'log')
		await user.click(button)
		expect(consoleSpy).toHaveBeenCalledTimes(0)
		useParams.mockReturnValue({ id: '1' })
		renderWithProviders(
			<MemoryRouter>
				<InventoryReport />
			</MemoryRouter>
		)
		const notification = screen.queryByText('Olet tehnyt tälle inventoinnille poistopyynnön')
		expect(notification).not.toBeInTheDocument()
	})
})



describe('RejectDeletionButton admin', () => {
	test('button text is different for admins', () => {
		renderWithProviders(
			<MemoryRouter>
				<RejectDeletionButton id={'d1'} isAdmin={true}/>
			</MemoryRouter>
		)
		expect(screen.getByText('Hylkää poistopyyntö')).toBeVisible()
	})
})