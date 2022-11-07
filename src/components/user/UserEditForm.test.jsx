import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserEditForm from './UserEditForm'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('UserEditForm', () => {
	let form,
		name,
		email,
		phone,
		submitButton
	const mockHandleSubmit = jest.fn()
	const mockSetName = jest.fn()
	const mockSetEmail = jest.fn()
	const mockSetPhone = jest.fn()
	const userDetails = {"auth":"xxx",
						 "user":{"id":"6368aeeb2ec2689b516f43b0", "name":"Uusi",
						 		 "email":"uuden_maili@posti.fi", "phone":"040667788",
						 		 "username":"uusi", "admin":"0"}}

	beforeEach(() => {
		render(
			<MemoryRouter>
				<UserEditForm
					validated={true}
					handleSubmit={mockHandleSubmit}
					userDetails={userDetails}
					setName={mockSetName}
					setEmail={mockSetEmail}
					setPhone={mockSetPhone}
				/>
			</MemoryRouter>
		)

		form = screen.getByTestId('useredit-form')
		name = screen.getByTestId('name')
		email = screen.getByTestId('email')
		phone = screen.getByTestId('phone')
		submitButton = screen.getByRole('button', { name: /tallenna/i })

		mockHandleSubmit.mockImplementation((e) => e.preventDefault())
	})

	test('renders the useredit form', () => {
		expect(form).toBeDefined()
	})

	test('email is required', () => {
		expect(email).toBeRequired()
	})

	test('name and phone number are not required', () => {
		expect(name).not.toBeRequired()
		expect(phone).not.toBeRequired()
	})

	test('changing name works', async () => {
		const user = userEvent.setup()
		name.value = ""
		await user.type(name, 'Testi')
		expect(name).toHaveValue('Testi')
	})

	test('changing the email works', async () => {
		const user = userEvent.setup()
		email.value = ""
		await user.type(email, 'testi.posti@posti.fi')
		expect(email).toHaveValue('testi.posti@posti.fi')
	})

	test('changing phone works', async () => {
		const user = userEvent.setup()
		phone.value = ""
		await user.type(phone, '0405556667')
		expect(phone).toHaveValue('0405556667')
	})

	test('Errors if no inputs', async () => {
		const user = userEvent.setup()
		name.value = ""
		email.value = ""
		phone.value = ""
		await user.click(submitButton)
		expect(screen.findAllByText('Anna kunnollinen sähköpostiosoite!'))
	})

	test('Error with invalid email', async () => {
		const user = userEvent.setup()
		await user.type(email, 'testi.posti@posti.')
		await user.click(submitButton)
		expect(screen.findAllByText('Anna kunnollinen sähköpostiosoite!'))
	})

	test('Error with invalid phone', async () => {
		const user = userEvent.setup()
		await user.type(phone, '033')
		await user.click(submitButton)
		expect(screen.findAllByText('Anna suomalainen puhelinnumero!'))
	})
})
