import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import EditedReportList from './EditedReportList'
import { renderWithProviders } from '../../utils/test-tools'
import store from '../../redux/store'
import { login } from '../../redux/reducers/userReducer'
import { appendInventory } from '../../redux/reducers/inventoryReducer'
import { appendAreas } from '../../redux/reducers/areaReducer'
import { setEditedInventories } from '../../redux/reducers/editedInventoryReducer'
import userEvent from '@testing-library/user-event'

const user = {'auth':'xyz', 
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

const editedList = [{
	'id': '0',
	'inventorydate': '2022-04-01',
	'method': 'echo',
	'areas': [{'coordinates': [{lat: 61.13918005, lng: 24.92832183},
		{lat: 60.140376, lng: 24.984626770},
		{lat: 60.172837, lng: 24.99938}]}],
	'visibility': 'good',
	'moreInfo': 'muokkaus on kivaa',
	'user': {'id':'u1', 'name': 'Miko'},
	'city': 'Utsjoki',
	'editReason': 'huvin vuoksi',
	'originalReport': '1'

}]



describe('EditedReportList no reports', () => {
	let editedReportList

	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<EditedReportList />
			</MemoryRouter>
		)
		editedReportList = screen.getByRole('table')
	})

	test('Renders only the header row if the list is empty', () => {
		expect(editedReportList).toBeDefined()
		const rows = screen.getAllByRole('row')
		expect(rows).toHaveLength(1)
		expect(rows[0]).toHaveTextContent('Inventoinnin päivämäärä')
		expect(rows[0]).toHaveTextContent('Tekijä')
		expect(rows[0]).toHaveTextContent('Muokkauksen syy')
	})

})

describe('EditedReportList with report', () => {
	let editedReportList

	beforeEach(() => {
		store.dispatch(login(user))
		store.dispatch(appendInventory(inventory1))
		store.dispatch(appendAreas(areas1))
		store.dispatch(setEditedInventories(editedList))
		renderWithProviders(
			<MemoryRouter>
				<EditedReportList />
			</MemoryRouter>
		)
		editedReportList = screen.getByRole('table')
	})

	test('Renders all the reports when filter not selected', () => {
		expect(editedReportList).toBeDefined()
		expect(screen.getByText('Miko')).not.toBeNull()
		expect(screen.getByText('01.04.2022')).not.toBeNull()
		expect(screen.getByText('huvin vuoksi')).not.toBeNull()
	})

	test('List item can be clicked', async () => {
		const request = screen.getByText('Miko')
		const user = userEvent.setup()
		await user.click(request)
	})

})