import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import InventoryForm from './InventoryForm'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('InventoryForm', () => {
	let form,
		coordinates,
		inventorydate,
		method,
		checkSight,
		checkEcho,
		checkDive,
		checkOther,
		attachments,
		moreInfo,
		name,
		email,
		phone,
		submitButton
	const COORDINATES = [
		[
			{ lat: 60.17797731341533, lng: 1.903111488320214 },
			{ lat: 60.17473315099313, lng: -24.886286597507773 },
			{ lat: -70.17114712497474, lng: 24.899506154574706 },
		],
	]
	const mockHandleSubmit = jest.fn()
	const mockSetMapLayers = jest.fn()
	const mockSetInventorydate = jest.fn()
	const mockSetMethod = jest.fn()
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
		checkSight = screen.getByTestId('sight')
		checkEcho = screen.getByTestId('echo')
		checkDive = screen.getByTestId('dive')
		checkOther = screen.getByTestId('other')
		attachments = screen.getByTestId('attachments')
		moreInfo = screen.getByTestId('moreInfo')
		name = screen.getByTestId('name')
		email = screen.getByTestId('email')
		phone = screen.getByTestId('phone')
		submitButton = screen.getByRole('button', { name: /lähetä/i })

		mockHandleSubmit.mockImplementation((e) => e.preventDefault())
		mockSetMethod.mockImplementation((v) => (method = v))
	})

	test('renders the inventory form', () => {
		expect(form).toBeDefined()
	})

	test('inventorydate is required', () => {
		expect(inventorydate).toBeRequired()
		expect(inventorydate).toBeInvalid()
	})

	test('method is required', () => {
		expect(checkSight).toBeRequired()
		expect(checkSight).toBeInvalid()
		expect(checkEcho).toBeRequired()
		expect(checkEcho).toBeInvalid()
		expect(checkDive).toBeRequired()
		expect(checkDive).toBeInvalid()
		expect(checkOther).toBeRequired()
		expect(checkOther).toBeInvalid()
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

	test('changing date works', async () => {
		fireEvent.change(inventorydate, {target: {value: '2022-10-07'}})
		expect(mockSetInventorydate).toBeCalledTimes(1)
		expect(inventorydate).toHaveValue('2022-10-07')
	})

	test('selecting method "sight" works', async () => {
		const user = userEvent.setup()
		await user.click(checkSight)
		expect(screen.findByTestId('visibility')).toBeDefined()
		expect(mockSetMethod).toBeCalledTimes(1)
	})

	test('selecting method "echo" works', async () => {
		const user = userEvent.setup()
		await user.click(checkEcho)
		expect(mockSetMethod).toBeCalledTimes(1)
	})

	test('selecting method "dive" works', async () => {
		const user = userEvent.setup()
		await user.click(checkDive)
		expect(screen.findByTestId('visibility')).toBeDefined()
		expect(mockSetMethod).toBeCalledTimes(1)
	})

	test('selecting method "other" works', async () => {
		const user = userEvent.setup()
		await user.click(checkOther)
		expect(screen.findByTestId('methodInfo')).toBeDefined()
		expect(mockSetMethod).toBeCalledTimes(1)
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

	test('submit handler is called on submit', async () => {
		const user = userEvent.setup()
		await user.click(submitButton)
		expect(form).not.toBeValid()
	})

	test('Errors if no inputs', async () => {
		const user = userEvent.setup()
		await user.click(submitButton)
		expect(screen.findAllByText('Anna sukelluksen koordinaatit!'))
		expect(screen.findAllByText('Anna sukelluksen ajankohta!'))
		expect(screen.findAllByText('Anna sähköposti!'))
	})
})