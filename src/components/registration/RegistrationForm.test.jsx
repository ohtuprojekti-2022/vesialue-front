import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import RegistrationForm from './RegistrationForm'


describe('Registration Form', () => {
	const mockHandleSubmit = jest.fn()
	const mockSetUsername = jest.fn()
	const mockSetEmail = jest.fn()
	const mockValidated = jest.fn()

	let username, email, password, submitButton

	beforeEach(() => {
		render(
			<MemoryRouter>
				<RegistrationForm
					handleSubmit={mockHandleSubmit}
					validated={mockValidated}
					setUsername={mockSetUsername}
					setEmail={mockSetEmail} />
			</MemoryRouter>
		)
		username = screen.getByTestId('username')
		email = screen.getByTestId('email')
		password = screen.getByTestId('password')
		submitButton = screen.getByTestId('submit')

		mockHandleSubmit.mockImplementation(e => {
			e.preventDefault()
		})
	})

	test('renders the registration form', () => {
		const element = screen.getByTestId('registration-form')
		expect(element).toBeDefined()
	})

	test('no user details stored before registration', () => {
		expect(localStorage.getItem('userDetails')).toBeNull()
	})

	test('username is required', async () => {
		act(() => {
			submitButton.click()
		})
		expect(username).toBeRequired()
		expect(username).toBeInvalid()
		expect(screen.getByText('Anna vähintään 3 merkkiä pitkä käyttäjänimi!')).toBeVisible()
	})

	test('password is required', async () => {
		act(() => {
			submitButton.click()
		})
		expect(password).toBeRequired()
		expect(password).toBeInvalid()
		expect(screen.getByText('Anna vähintään 10 merkkiä pitkä salasana!')).toBeVisible()
	})

	test('email address is required', async () => {
		act(() => {
			submitButton.click()
		})
		expect(email).toBeRequired()
		expect(email).toBeInvalid()
		expect(screen.getByText('Anna validi sähköpostiosoite!')).toBeVisible()
	})

	test('email address must be in the correct format', async () => {
		const user = userEvent.setup()
		await user.type(email, 'invalid.mail.com')

		act(() => {
			submitButton.click()
		})
		expect(email).toBeInvalid()
	})
})
