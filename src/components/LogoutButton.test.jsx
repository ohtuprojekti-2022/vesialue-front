import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { act } from 'react-dom/test-utils'

describe('LogoutButton', () => {
	let userDetails = JSON.stringify({
		auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMzMmI1MDZjOTdiYjE2N2Q3ODk0MmNiIn0.yV8Ed4EugDC5dk6KYimhKNRkV5wDptg296sB6Ai_eBA',
		user: {
			id: '6332b506c97bb167d78942cb',
			name: '',
			email: 'test.person@email.com',
			phone: '',
			username: 'testperson',
		},
	})
	const setUserDetails = (newUserDetails) => {
		userDetails = newUserDetails
	}

	beforeEach(() => {
		localStorage.setItem('userDetails', userDetails)
	})

	test('renders button', () => {
		render(
			<MemoryRouter>
				<LogoutButton setUserDetails={setUserDetails} />
			</MemoryRouter>
		)
		const button = screen.getByTestId('logout-button')
		expect(button).toBeDefined()
	})

	test('click removes auth-token and user details', () => {
		render(
			<MemoryRouter>
				<LogoutButton setUserDetails={setUserDetails} />
			</MemoryRouter>
		)
		const button = screen.getByTestId('logout-button')
        expect(localStorage.getItem('userDetails')).not.toBeNull()
		act(() => {
			button.click()
		})
        expect(localStorage.getItem('userDetails')).toBeNull()
	})
})
