import { login } from '../../redux/reducers/userReducer'
import { appendInventory } from '../../redux/reducers/inventoryReducer'
import { appendAreas } from '../../redux/reducers/areaReducer'
import { appendEditedInventories } from '../../redux/reducers/editedInventoryReducer'
import { renderWithProviders } from '../../utils/test-tools'
import store from '../../redux/store'
import { MemoryRouter, useParams } from 'react-router-dom'
import React from 'react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import EditedReport from './EditedReport'

const user = {'auth':'xxx', 'user':{'id':'u1', 'name':'Uusi', 'email':'uuden_maili@posti.fi', 'phone':'040667788', 'username':'uusi', 'admin':'0'}
}

const admin = {'auth':'y3e', 'user':{'id':'ad1', 'name':'Admin', 'email':'admin@posti.fi', 'phone':'0466667898', 'username':'admin', 'admin':'1'}
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
	moreInfo: 'En löytänyt mitään erityistä.'
}

const areas1 = [{'inventoryId': '1', 'id':'a1',
	'coordinates': [{lat: 60.13918005, lng: 24.92832183},
		{lat: 60.140376, lng: 24.984626770},
		{lat: 60.172837, lng: 24.99938}]}]

const edited1 = {
	id: 'ed1',
	areas: [
		{
			coordinates: [
				{
					lat: 60.167987680345455,
					lng: 25.004539489746097
				},
				{
					lat: 60.15978879045419,
					lng: 24.97055053710938
				},
				{
					lat: 60.16064293693044,
					lng: 25.01174926757813
				},
				{
					lat: 60.16457172482073,
					lng: 25.03269195556641
				}
			]
		}
	],
	user: user['user'],
	inventorydate: '2022-11-29',
	method: 'echo',
	visibility: '',
	city: 'Helsinki, Katajanokka',
	methodInfo: '',
	attachments: true,
	moreInfo: 'Hylky.',
	editReason: 'Muistin väärin.',
	originalReport: '1'
}

store.dispatch(login(user))
store.dispatch(appendInventory(inventory1))
store.dispatch(appendAreas(areas1))
store.dispatch(appendEditedInventories(edited1))

describe('EditedReportUser', () => {
	beforeEach(() => {
		useParams.mockReturnValue({ id: 'ed1' })
		renderWithProviders(
			<MemoryRouter>
				<EditedReport />
			</MemoryRouter>
		)
	})

	test('renders information from original and edited report', () => {
		expect(screen.getByText('30.11.2022')).toBeVisible()
		expect(screen.getByText('29.11.2022')).toBeVisible()
		expect(screen.getByText('Sukellus')).toBeVisible()
		expect(screen.getByText('Viistokaiutus')).toBeVisible()
		expect(screen.getByText('huono (alle 2m)')).toBeVisible()
		expect(screen.getByText('Ei ole')).toBeVisible()
		expect(screen.getByText('On')).toBeVisible()
		expect(screen.getByText('En löytänyt mitään erityistä.')).toBeVisible()
		expect(screen.getByText('Hylky.')).toBeVisible()
		expect(screen.getByText('Muistin väärin.')).toBeVisible()
	})

	test('user can see cancel button', () => {
		expect(screen.getByText('Peruuta muokkauspyyntö')).toBeVisible()
	})

	test('user cannot see approve button', () => {
		expect(screen.queryByText('Hyväksy')).not.toBeInTheDocument()
	})

})

describe('EditedReportAdmin', () => {
	beforeEach(() => {
		useParams.mockReturnValue({ id: 'ed1' })
		store.dispatch(login(admin))
		renderWithProviders(
			<MemoryRouter>
				<EditedReport />
			</MemoryRouter>
		)
	})

	test('admin can see approve button', () => {
		expect(screen.getByText('Hyväksy')).toBeDefined()
	})

	test('admin can see disapprove button', () => {
		expect(screen.getByText('Hylkää')).toBeDefined()
	})
})