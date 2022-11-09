import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { renderWithProviders } from '../utils/test-tools'

describe('LogoutButton', () => {
	let initialUserDetails = JSON.stringify({
		auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMzMmI1MDZjOTdiYjE2N2Q3ODk0MmNiIn0.yV8Ed4EugDC5dk6KYimhKNRkV5wDptg296sB6Ai_eBA',
		user: {
			id: '6332b506c97bb167d78942cb',
			name: '',
			email: 'test.person@email.com',
			phone: '',
			username: 'testperson',
		},
	})

	beforeEach(() => {
		localStorage.setItem('userDetails', initialUserDetails)
		renderWithProviders(
			<MemoryRouter>
				<LogoutButton />
			</MemoryRouter>)
	})

	test('renders button', () => {
		const logoutButton = screen.getByRole('button', { name: /kirjaudu ulos/i })
		expect(logoutButton).toBeDefined()
	})

	test('click removes auth-token and user details', async () => {
		const logoutButton = screen.getByRole('button', { name: /kirjaudu ulos/i })
		expect(localStorage.getItem('userDetails')).not.toBeNull()

		const user = userEvent.setup()
		await user.click(logoutButton)
		expect(localStorage.getItem('userDetails')).toBeNull()
	})
})
