import { MemoryRouter, useParams } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-tools'
import EditRequestView from './EditRequestView'
import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

const editRequest = {'id': '123'}

let alert

describe('EditRequestView', () => {
	beforeEach(() => {
		useParams.mockReturnValue(editRequest)

		renderWithProviders(
			<MemoryRouter>
				<EditRequestView isAdmin={true} editRequest={editRequest}/>
			</MemoryRouter>
		)
		alert = screen.getByTestId('edit-request-alert')
	})

	test('Renders component', () => {
		expect(alert).toBeDefined()
	})

	test('Renders button', () => {
		const button = screen.getByRole('button', { name: /Tarkista pyyntö/i })
		expect(button).toBeDefined()
	})

	test('Renders text', () => {
		expect(screen.getByText('Tälle inventoinnille on tehty muokkauspyyntö')).toBeVisible()
	})

	test('Button can be clicked', async () => {
		const user = userEvent.setup()
		const button = screen.getByRole('button', { name: /Tarkista pyyntö/i })
		await user.click(button)
	})
})