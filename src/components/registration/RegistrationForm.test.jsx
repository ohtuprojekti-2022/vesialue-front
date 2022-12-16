import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import RegistrationForm from './RegistrationForm'


describe('Registration Form', () => {
	const mockHandleSubmit = jest.fn()
	const mockSetUsername = jest.fn()
	const mockSetPassword = jest.fn()
	const mockSetEmail = jest.fn()
	const mockSetName = jest.fn()
	const mockSetPhone = jest.fn()
	const mockValidated = true
	const mockSetShowTOS = jest.fn()
	const mockSetShowPP = jest.fn()

	let form, username, email, password, name, phone, submitButton, terms

	beforeEach(() => {
		render(
			<MemoryRouter>
				<RegistrationForm
					handleSubmit={mockHandleSubmit}
					validated={mockValidated}
					setUsername={mockSetUsername}
					setPassword={mockSetPassword}
					setEmail={mockSetEmail}
					setName={mockSetName}
					setPhone={mockSetPhone}
					setShowTOS={mockSetShowTOS}
					setShowPP={mockSetShowPP} />
			</MemoryRouter>
		)
		form = screen.getByTestId('registration-form')
		username = screen.getByRole('textbox', {  name: /käyttäjänimi/i })
		email = screen.getByRole('textbox', { name: /sähköposti/i })
		password = screen.getByLabelText(/salasana/i)
		name = screen.getByRole('textbox', {  name: /etu- ja sukunimi/i })
		phone = screen.getByRole('textbox', {  name: /puhelinnumero/i })
		submitButton = screen.getByRole('button', {  name: /rekisteröidy/i } )
		terms = screen.getByTestId('terms-of-services')

		mockHandleSubmit.mockImplementation(e => {
			e.preventDefault()
		})
	})

	test('renders the registration form', () => {
		expect(form).toBeDefined()
	})

	test('no user details stored before registration', () => {
		expect(localStorage.getItem('userDetails')).toBeNull()
	})

	test('username is required', async () => {
		expect(username).toBeRequired()
		expect(username).toBeInvalid()

		const user = userEvent.setup()
		await user.type(username, 'testuser')
		expect(username).toBeValid()
	})

	test('password is required', async () => {
		expect(password).toBeRequired()
		expect(password).toBeInvalid()

		const user = userEvent.setup()
		await user.type(password, 'testpassword')
		expect(password).toBeValid()
	})

	test('email address is required', async () => {
		expect(email).toBeRequired()
		expect(email).toBeInvalid()
	})

	test('email address must be in the correct format', async () => {
		const user = userEvent.setup()
		await user.type(email, 'invalid.testmail.com')
		expect(email).toBeInvalid()

		await user.clear(email)
		await user.type(email, 'valid@testmail.com')
		expect(email).toBeValid()
	})

	test('phone number must be in the correct format', async () => {
		const user = userEvent.setup()
		await user.type(phone, 'mun numero')
		expect(phone).toBeInvalid()

		await user.clear(phone)
		await user.type(phone, '0457384723')
		expect(phone).toBeValid()
	})

	test('name cant be longer than 60 characters', async () => {
		const user = userEvent.setup()
		await user.type(name, 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggg')
		expect(name).toHaveValue('aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffff')

		await user.clear(name)
		await user.type(name, 'Urpo Urveloinen')
		expect(name).toBeValid()
	})

	test('name and phone number are not required', async () => {
		expect(name).not.toBeRequired()
		expect(phone).not.toBeRequired()
		expect(name).toBeValid()
		expect(phone).toBeValid()
	})

	test('the form is valid if all required fields are filled', async () => {
		expect(form).toBeInvalid()

		const user = userEvent.setup()
		await user.type(username, 'testuser')
		await user.type(email, 'react@test.com')
		await user.type(password, 'testpassword')

		expect(form).toBeValid()
	})

	test('submit handler is called on submit', async () => {
		const user = userEvent.setup()
		await user.click(terms)
		await user.click(submitButton)
		expect(terms).toBeChecked()
		expect(submitButton).not.toBeDisabled()
		expect(mockHandleSubmit).toBeCalledTimes(1)
	})

	test('Privacy Policy can be opened', async () => {
		const user = userEvent.setup()
		const pp = screen.getByTestId('pp')
		await user.click(pp)
	})

})
