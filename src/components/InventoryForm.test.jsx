import React from 'react'
import { render,screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InventoryForm from './InventoryForm'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('InventoryForm', () => {

	const mockHandleSubmit = jest.fn()

	let form, coordinates, date, methodInfo,
		more_info, name, email, phone, submitButton
		, attachments

	beforeEach(() => {
		render(
			<MemoryRouter>
				<InventoryForm
					handleSubmit={mockHandleSubmit} />
			</MemoryRouter>
		)
		form = screen.getByTestId('inventory-form')
		coordinates = screen.getByTestId('coordinates')
		date = screen.getByTestId('date')
		methodInfo = screen.getByTestId('method')
		attachments = screen.getByTestId('attachments')
		more_info = screen.getByTestId('more_info')
		name = screen.getByTestId('name')
		email = screen.getByTestId('email')
		phone = screen.getByTestId('phone')
		submitButton = screen.getByTestId('submit')
	})

	test('renders the inventory form', () => {
		expect(form).toBeDefined()
	})

	test('coordinates are required', () => {
		expect(coordinates).toBeRequired()
		expect(coordinates).toBeInvalid()
	})

	test('date is required', () => {
		expect(date).toBeRequired()
		expect(date).toBeInvalid()
	})

	test('method is required', () => {
		expect(methodInfo).toBeRequired()
		expect(methodInfo).toBeInvalid()
	})

	test('email is required', () => {
		expect(email).toBeRequired()
		expect(email).toBeInvalid()
	})

	test('name and phone number are not required', () => {
		expect(name).not.toBeRequired()
		expect(phone).not.toBeRequired()
		expect(name).toBeValid()
		expect(phone).toBeValid()
	})

	test('changing name works', async () => {
		const user = userEvent.setup()
		await user.type(name, 'Testi')
		expect(name).toHaveValue('Testi')
	})

	test('changing phone works', async () => {
		const user = userEvent.setup()
		await user.type(phone, '4444')
		expect(phone).toHaveValue('4444')
	})

	test('changing more info works', async () => {
		const user = userEvent.setup()
		await user.type(more_info, 'testi-info')
		expect(more_info).toHaveValue('testi-info')
	})

	test('changing attachments work', async () => {
		const user = userEvent.setup()
		await user.click(attachments)
		expect(attachments).toBeChecked()
	})

	test('other methods option works', async () => {
		const user = userEvent.setup()
		await user.click(screen.getByTestId('other'))
		await user.type(screen.getByTestId('other_info'), 'other_info test')
		expect(screen.getByTestId('other')).toBeChecked()
		expect(screen.getByTestId('other_info')).toHaveValue('other_info test')
	})

	test('submit handler is called on submit', async () => {
		const user = userEvent.setup()
		await user.click(submitButton)
		expect(form).toBeValid()
	})

	test('the form is valid if all required fields are filled', async () => {
		const user = userEvent.setup()
		await user.type(coordinates, '123')
		await user.type(date, '2000-01-01')
		await user.click(screen.getByTestId('dive'))
		await user.selectOptions(screen.getByTestId('visibility'), 'normal')
		await user.type(email, 'react@test.com')
		await user.click(submitButton)
		expect(form).toBeValid()
	})

	test('Errors if no inputs', async () => {
		const user = userEvent.setup()
		await user.click(submitButton)
		expect(screen.findAllByText('Anna sukelluksen koordinaatit!'))
		expect(screen.findAllByText('Anna sukelluksen ajankohta!'))
		expect(screen.findAllByText('Anna sähköposti!'))
	})
})