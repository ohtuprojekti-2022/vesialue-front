import { login } from '../../redux/reducers/userReducer'
import { appendInventory } from '../../redux/reducers/inventoryReducer'
import { appendAreas } from '../../redux/reducers/areaReducer'
import { renderWithProviders } from '../../utils/test-tools'
import store from '../../redux/store'
import { MemoryRouter } from 'react-router-dom'
import AdminDeleteButton from './AdminDeleteButton'
import React from 'react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const user = {'auth':'xxx', 'user':{'id':'u1', 'name':'Uusi', 'email':'uuden_maili@posti.fi', 'phone':'040667788', 'username':'uusi', 'admin':'0'}
}
const inventory1 = {
	id: '1',
	areas: [
		{
			area: '6389baa63ad344ec77cc10a5'
		}
	],
	user: user['user'],
	inventorydate: '2022-11-30',
	method: 'dive',
	visibility: 'bad',
	city: 'Helsinki, Santahamina',
	methodInfo: '',
	attachments: false,
	name: '',
	email: '',
	phone: '',
	moreInfo: 'En löytänyt mitään erityistä.'
}


const inventory2 = {
	id: '2',
	areas: [
		{
			area: '63887c00ba48b84e450d7f27'
		}
	],
	user: user['user'],
	inventorydate: '2022-11-30',
	method: 'sight',
	visibility: 'bad',
	city: 'Helsinki, Jollas',
	methodInfo: '',
	attachments: false,
	name: '',
	email: '',
	phone: '',
	moreInfo: 'ei mitään'
}

const areas1 = [{'inventoryId': '1', 'id':'a1',
	'coordinates': [{lat: 60.13918005, lng: 24.92832183},
		{lat: 60.140376, lng: 24.984626770},
		{lat: 60.172837, lng: 24.99938}]}]

const areas2 = [{'inventoryId': '2', 'id':'a2',
	'coordinates':
            [{lat: 60.239180, lng: 24.82832183}, {lat: 60.240376, lng: 24.88462677}, {lat: 60.2728377, lng: 24.8993896}]},
{'inventoryId': '2', 'id':'a22',
	'coordinates':
            [{lat: 61.139180, lng: 25.928321}, {lat: 61.1403765, lng: 25.98462677}, {lat: 61.1728377, lng: 25.999384}]}]
store.dispatch(login(user))
store.dispatch(appendInventory(inventory1))
store.dispatch(appendInventory(inventory2))
store.dispatch(appendAreas(areas1))
store.dispatch(appendAreas(areas2))


let button


describe('AdminDeleteButton', () => {
	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<AdminDeleteButton id={'1'}/>
				
			</MemoryRouter>
		)
		button = screen.getByTestId('admin-delete-button')
	})
    
	test('Renders button', () => {
		expect(button).toBeDefined()
	})

	test('On click does not cause error', async () => {
		const user = userEvent.setup()
		const consoleSpy = jest.spyOn(console, 'log')

		await user.click(button)
		expect(consoleSpy).toHaveBeenCalledTimes(0)
		
		
	})
})