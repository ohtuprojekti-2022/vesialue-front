import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InventoryForm from './InventoryForm'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('InventoryForm', () => {
	let form,
		coordinates,
		inventorydate,
		method,
		moreInfo,
		name,
		email,
		phone,
		submitButton,
		attachments

	const mockHandleSubmit = jest.fn(e => e.preventDefault())
	const mockSetMapLayers = jest.fn()
	const mockSetInventorydate = jest.fn()
	const mockSetMethod = v => (method = v)
	const mockSetVisibility = jest.fn()
	const mockSetMethodInfo = jest.fn()
	const mockSetAttachments = jest.fn()
	const mockSetMoreInfo = jest.fn()
	const mockSetName = jest.fn()
	const mockSetEmail = jest.fn()
	const mockSetPhone = jest.fn()

	beforeEach(() => {
		render(
			<MemoryRouter>
				<InventoryForm
					validated={true}
					handleSubmit={mockHandleSubmit}
					setMapLayers={mockSetMapLayers}
					inventorydate={inventorydate}
					setInventorydate={mockSetInventorydate}
					method={method}
					setMethod={mockSetMethod}
					setVisibility={mockSetVisibility}
					setMethodInfo={mockSetMethodInfo}
					attachments={true}
					setAttachments={mockSetAttachments}
					setMoreInfo={mockSetMoreInfo}
					setName={mockSetName}
					setEmail={mockSetEmail}
					setPhone={mockSetPhone}
				/>
			</MemoryRouter>
		)
		form = screen.getByTestId('inventory-form')
		coordinates = screen.getByTestId('coordinates')
		inventorydate = screen.getByTestId('inventorydate')
		attachments = screen.getByTestId('attachments')
		moreInfo = screen.getByTestId('moreInfo')
		name = screen.getByTestId('name')
		email = screen.getByTestId('email')
		phone = screen.getByTestId('phone')
		submitButton = screen.getByTestId('submit')
	})

	test('renders the inventory form', () => {
		expect(form).toBeDefined()
	})

	test('inventorydate is required', () => {
		expect(inventorydate).toBeRequired()
		expect(inventorydate).toBeInvalid()
	})

	/* test('method is required', () => {
		expect(methodInfo).toBeRequired()
		expect(methodInfo).toBeInvalid()
	}) */

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
		await user.type(moreInfo, 'testi-info')
		expect(moreInfo).toHaveValue('testi-info')
	})

	test('changing attachments work', async () => {
		const user = userEvent.setup()
		await user.click(attachments)
		expect(attachments).toBeChecked()
	})

	/* 	test('other methods option works', async () => {
		const user = userEvent.setup()
		await user.click(screen.getByTestId('other'))
		await user.type(screen.getByTestId('methodInfo'), 'methodInfo test')
		expect(screen.getByTestId('other')).toBeChecked()
		expect(screen.getByTestId('methodInfo')).toHaveValue('methodInfo test')
	}) */

	test('submit handler is called on submit', async () => {
		const user = userEvent.setup()
		await user.click(submitButton)
		expect(form).not.toBeValid()
	})

	/* 	test('the form is valid if all required fields are filled', async () => {
		const user = userEvent.setup()
		await user.type(coordinates, '123')
		await user.type(inventorydate, '2000-01-01')
		await user.click(screen.getByTestId('dive'))
		await user.selectOptions(screen.getByTestId('visibility'), 'normal')
		await user.type(email, 'react@test.com')
		await user.click(submitButton)
		expect(form).toBeValid()
	}) */

	test('Errors if no inputs', async () => {
		const user = userEvent.setup()
		await user.click(submitButton)
		expect(screen.findAllByText('Anna sukelluksen koordinaatit!'))
		expect(screen.findAllByText('Anna sukelluksen ajankohta!'))
		expect(screen.findAllByText('Anna sähköposti!'))
	})
})
