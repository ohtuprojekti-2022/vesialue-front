import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, useParams } from 'react-router-dom'
import DeleteInventoryForm from './DeleteInventoryForm'
import { renderWithProviders } from '../../utils/test-tools'
import userEvent from '@testing-library/user-event'

describe('DeleteInventoryForm', () => {
	let deleteReason
	const mockSetDeleteReason = jest.fn()

	beforeEach(() => {
		useParams.mockReturnValue({ id: '1' })
		renderWithProviders(
			<MemoryRouter>
				<DeleteInventoryForm setDeleteReason={mockSetDeleteReason}/>
			</MemoryRouter>
		)	

		deleteReason = screen.getByTestId('deleteReason')
	})
        
	test('form is rendered', () => {
		expect(screen.getByText('Poiston syy')).not.toBeNull()
		expect(screen.getByText('Pyydä inventoinnin poistoa')).not.toBeNull()
	})

	test('delete reason can be changed', async () => {
		const user = userEvent.setup()
		await user.type(deleteReason, 'Testin takia')
		expect(deleteReason).toHaveValue('Testin takia')
	})

	test('deletion modal is shown', async () => {
		const user = userEvent.setup()
		await user.type(deleteReason, 'Testin takia')
		const button = screen.getByText('Pyydä inventoinnin poistoa')
		await user.click(button)
		expect(screen.getByText('Oletko varma että haluat poistaa tämän inventoinnin?')).not.toBeNull()
	})

	test('delete and cancel buttons can be clicked', async () => {
		const user = userEvent.setup()
		await user.type(deleteReason, 'Testin takia')
		const button = screen.getByText('Pyydä inventoinnin poistoa')
		await user.click(button)
		const deletebutton = screen.getByText('Poista')
		const cancelbutton = screen.getByText('Älä poista')
		await user.click(deletebutton)
		await user.click(cancelbutton)
		
	})
        
})