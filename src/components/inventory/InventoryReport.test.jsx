import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, useParams } from 'react-router-dom'
import InventoryReport from './InventoryReport'
import { renderWithProviders } from '../../utils/test-tools'
import store from '../../redux/store'
import { login } from '../../redux/reducers/userReducer'
import { appendInventory } from '../../redux/reducers/inventoryReducer'
import { appendAreas } from '../../redux/reducers/areaReducer'

const user = {'auth':'xxx', 'user':{'id':'u1', 'name':'Uusi', 'email':'uuden_maili@posti.fi', 'phone':'040667788', 'username':'uusi', 'admin':'0'}
}
const inventory1 = {'id': '1', 'inventorydate': '2002-12-11', 'method': 'sight', 'visibility': 'good', 'moreInfo': 'ei', 'user': {'id':'u1'}
}
const inventory2 = {'id': '2',
	'inventorydate': '2022-02-10',
	'method': 'echo',
	'visibility': 'good',
	'moreInfo': 'tähän pidempi teksti',
	'user': {'id':'u2'}
}
const inventory3 = {'id': '3',
	'inventorydate': '2021-10-05',
	'method': 'dive',
	'visibility': 'bad',
	'moreInfo': 'kolmas inventory',
	'user': {'id':'u1'}
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
const areas3 = [{'inventoryId': '3', 'id':'a3',
	'coordinates': [{lat: 60.44918005, lng: 24.7783218},
		{lat: 60.440376, lng: 24.77462677},
		{lat: 60.4428377, lng: 24.77938}]}]

store.dispatch(login(user))
store.dispatch(appendInventory(inventory1))
store.dispatch(appendInventory(inventory2))
store.dispatch(appendInventory(inventory3))
store.dispatch(appendAreas(areas1))
store.dispatch(appendAreas(areas2))
store.dispatch(appendAreas(areas3))

let report

describe('InventoryReport', () => {

	beforeEach(() => {
		useParams.mockReturnValue({ id: '1' })

		renderWithProviders(
			<MemoryRouter>
				<InventoryReport />
			</MemoryRouter>
		)
		report = screen.getByTestId('report-card')
	})
	
	test('Renders component', () => {
		expect(report).toBeDefined()
	})

	test('Report includes the given data (inventorydate, method, visibility, and moreInfo)', () => {
		expect(screen.getByText('Päivämäärä: 11.12.2002')).toBeVisible()
		expect(screen.getByText('Tapa: Näköhavainto')).toBeVisible()
		expect(screen.getByText('Näkyvyys: hyvä (yli 5m)')).toBeVisible()
		expect(screen.getByText('Lisätietoja: ei')).toBeVisible()
	})

	test('Renders the modify button when the user has made the report', () => {
		const modifyButton = screen.getByRole('button', { name: /muokkaa/i })
		expect(modifyButton).toBeDefined()
	})
})

describe('InventoryReport2', () => {

	beforeEach(() => {
		useParams.mockReturnValue({ id: '2' })

		renderWithProviders(
			<MemoryRouter>
				<InventoryReport />
			</MemoryRouter>
		)
		report = screen.getByTestId('report-card')
	})
	
	test('Renders component', () => {
		expect(report).toBeDefined()
	})

	test('Open a different report', () => {
		expect(screen.getByText('Päivämäärä: 10.02.2022')).toBeVisible()
		expect(screen.getByText('Tapa: Viistokaiutus')).toBeVisible()
		expect(screen.getByText('Lisätietoja: tähän pidempi teksti')).toBeVisible()
		expect(screen.queryByText('Näkyvyys: hyvä (yli 5m)')).not.toBeInTheDocument()
	})

	test('Does not render the modify button when report is not users', () => {
		expect(screen.queryByRole('button', { name: /muokkaa/i })).not.toBeInTheDocument()
	})
})
