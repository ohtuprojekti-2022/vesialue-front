import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'


describe('Login Form', () => {

	const mockValidated = true
	const mockHandleSubmit = jest.fn()
	const mockSetUsername = jest.fn()
	const mockSetPassword = jest.fn()

	beforeEach(() => {
		render(
			<MemoryRouter>
				<LoginForm 
					validated={mockValidated}
					handleSubmit={mockHandleSubmit}
					setUsername={mockSetUsername}
					setPassword={mockSetPassword} />
			</MemoryRouter>
		)
	})

	test('renders form', () => {
		const loginform = screen.getByTestId('login-form')
		expect(loginform).toBeDefined()
	})

	test('submit function called', async () => {
		const user = userEvent.setup()
		const submitButton = screen.getByTestId('loginbutton')
		await user.click(submitButton)
		expect(mockHandleSubmit).toBeCalledTimes(1)
	})

	test('login username required', async () => {
		const username = screen.getByTestId('user-name')
		expect(username).toBeRequired()
		expect(username).toBeInvalid()

		const user = userEvent.setup()
		await user.type(username, 'testaaja')
		expect(username).toBeValid()
	})

	test('login password required', async () => {
		const password = screen.getByTestId('pass-word')
		expect(password).toBeRequired()
		expect(password).toBeInvalid()

		const user = userEvent.setup()
		await user.type(password, 'salainensana')
		expect(password).toBeValid()
	})

})
