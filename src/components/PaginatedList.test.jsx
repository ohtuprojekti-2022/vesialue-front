import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import PaginatedList from './PaginatedList'
import { renderWithProviders } from '../utils/test-tools'

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
