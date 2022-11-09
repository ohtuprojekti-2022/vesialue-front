import React from 'react'
import Table from 'react-bootstrap/Table'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter, useParams } from 'react-router-dom'
import InventoryListItem from './InventoryListItem'
import { renderWithProviders } from '../../utils/test-tools'
import store from '../../redux/store'
import { login } from '../../redux/reducers/userReducer'
import { appendInventory } from '../../redux/reducers/inventoryReducer'
import { appendAreas } from '../../redux/reducers/areaReducer'

const columns = { date: true, method: true, creator: true, city: true }
const report1 = {'id': '1',
				'inventorydate': '2002-12-11',
				'method': 'sight',
				'visibility': 'good',
				'moreInfo': 'ei',
				'name': '',
				'email': ''
}
const report2 = {'id': '1',
				'inventorydate': '2007-10-11',
				'method': 'dive',
				'visibility': 'good',
				'moreInfo': 'ei',
				'city':'Kellokoski',
				'user': {'id':'u2',
						'name':'Testi-Pekka'}
}

describe('InventoryListItem', () => {
	let inventoryListItem

	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<Table>
					<thead>
						<InventoryListItem
							report={report1}
							columns={columns}
						/>
					</thead>
				</Table>
			</MemoryRouter>
		)
		inventoryListItem = screen.getByRole('row')
	})

	test('Given text is included with anonymous user', () => {
		expect(inventoryListItem).toBeDefined()
		const rows = screen.getAllByRole('row')
		expect(rows).toHaveLength(1)
		expect(rows[0]).toHaveTextContent('11.12.2002NäköhavaintoTuntematon')
	})

	test('Click row', async () => {
		const user = userEvent.setup()
		await user.click(inventoryListItem)
	})

})

describe('InventoryListItem2', () => {
	let inventoryListItem

	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<Table>
					<thead>
						<InventoryListItem
							report={report2}
							columns={columns}
						/>
					</thead>
				</Table>
			</MemoryRouter>
		)
		inventoryListItem = screen.getByRole('row')
	})

	test('All text is included', () => {
		expect(inventoryListItem).toBeDefined()
		const rows = screen.getAllByRole('row')
		expect(rows).toHaveLength(1)
		expect(rows[0]).toHaveTextContent('11.10.2007SukellusTesti-PekkaKellokoski')
	})

})
