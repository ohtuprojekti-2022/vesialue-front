import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import InventoryList from './InventoryList'
import { renderWithProviders } from '../../utils/test-tools'

describe('InventoryList', () => {
	let inventoryList

	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<InventoryList />
			</MemoryRouter>
		)
		inventoryList = screen.getByRole('table')
	})

	test('Renders only the header row if the list is empty', () => {
		expect(inventoryList).toBeDefined()
		const rows = screen.getAllByRole('row')
		expect(rows).toHaveLength(1)
		expect(rows[0]).toHaveTextContent('Inventoinnin päivämäärä')
		expect(rows[0]).toHaveTextContent('Tekijä')
		expect(rows[0]).toHaveTextContent('Havainnon tyyppi')
		expect(rows[0]).toHaveTextContent('Kaupunki')
	})

})
