import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EditInventoryForm from './EditInventoryForm'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-tools'
import userEvent from '@testing-library/user-event'

describe('EditInventoryForm', () => {
	let moreInfo, editReason
	const mockSetMoreInfo = jest.fn()
	const mockSetEditReason = jest.fn()
	const mockSetMethodInfo = jest.fn()
	const mockSetMethod = jest.fn()
	const mockSetVisibility = jest.fn()
    
	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<EditInventoryForm 
					setMoreInfo={mockSetMoreInfo}
					setEditReason={mockSetEditReason}
					setMethodInfo={mockSetMethodInfo}
					setMethod={mockSetMethod}
					setVisibility={mockSetVisibility}
				/>
			</MemoryRouter>
		)
	})

	test('form is rendered', () => {
		expect(screen.getByText('Inventoinnin päivämäärä')).not.toBeNull()
	})

	test('more info can be changed', async () => {
		const user = userEvent.setup()
		moreInfo = screen.getByTestId('moreInfo')
		moreInfo.value = ''
		await user.type(moreInfo, 'lisää inffoa')
		expect(moreInfo).toHaveValue('lisää inffoa')
	})

	test('edit reason can be changed', async () => {
		const user = userEvent.setup()
		editReason = screen.getByTestId('editReason')
		editReason.value = ''
		await user.type(editReason, 'koska tuntui siltä')
		expect(editReason).toHaveValue('koska tuntui siltä')
	})

	test('methods can be checked', async () => {
		const user = userEvent.setup()
		const echo = screen.getByTestId('echo')
		await user.click(echo)
	})

})