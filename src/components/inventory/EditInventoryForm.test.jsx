import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EditInventoryForm from './EditInventoryForm'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-tools'
import userEvent from '@testing-library/user-event'

describe('EditInventoryForm', () => {
	let moreInfo, editReason, attachments, inventoryDate
	const mockSetMoreInfo = jest.fn()
	const mockSetEditReason = jest.fn()
	const mockSetAttachments = jest.fn()
	const mockSetMethodInfo = jest.fn()
    
	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<EditInventoryForm 
					setMoreInfo={mockSetMoreInfo}
					setEditReason={mockSetEditReason}
					setAttachments={mockSetAttachments}
					setMethodInfo={mockSetMethodInfo}
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

	test('attachments can be checked', async () => {
		const user = userEvent.setup()
		attachments = screen.getByTestId('attachments')
		await user.click(attachments)
		expect(attachments).toBeChecked()
	})

})