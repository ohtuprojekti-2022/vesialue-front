import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EditInventoryForm from './EditInventoryForm'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-tools'

describe('EditInventoryForm', () => {
    
	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<EditInventoryForm />
			</MemoryRouter>
		)
	})

	test('form is rendered', () => {
		expect(screen.getByText('Inventoinnin päivämäärä')).not.toBeNull()
	})

})