import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Frontpage from './Frontpage'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../utils/test-tools'

describe('Frontpage', () => {
    
	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<Frontpage />
			</MemoryRouter>
		)
		
	})

	test('shows map on screen', () => {
		expect(screen.getByText('Leaflet')).not.toBeNull
	})

	test('shows filterform on screen', () => {
		expect(screen.getByText('Suodata raportteja')).not.toBeNull
	})

	test('shows inventorylist on screen', () => {
		expect(screen.getByText('Inventoinnin päivämäärä')).not.toBeNull
	})

})
