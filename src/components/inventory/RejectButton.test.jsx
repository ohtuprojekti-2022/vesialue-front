import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-tools'
import RejectButton from './RejectButton'
import userEvent from '@testing-library/user-event'

jest.mock('axios')

let button
describe('RejectDeletionButton user', () => {
	
	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<RejectButton id={'del1'} isAdmin={false}/>
			</MemoryRouter>
		)
		button = screen.getByText('Peruuta muokkauspyyntö')
	})

	test('Button can be clicked', async () => {
		const user = userEvent.setup()
		await user.click(button)
	})

})