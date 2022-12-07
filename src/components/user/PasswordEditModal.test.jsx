import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderWithProviders } from '../../utils/test-tools'
import PasswordEditModal from './PasswordEditModal'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import store from '../../redux/store'
import { login } from '../../redux/reducers/userReducer'

describe('PasswordEditModal', () => {
	let modal,
		current_password,
		new_password,
		new_password2,
		submitButton
	const mockSetShowModal = jest.fn()

	const user = {'auth':'xxx', 'user':{'id':'u1', 'name':'Uusi', 'email':'uuden_maili@posti.fi', 'phone':'040667788', 'username':'uusi', 'admin':'0'}}
	
	store.dispatch(login(user))

	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<PasswordEditModal
					show={true}
					close={() => mockSetShowModal(false)}
				/>
			</MemoryRouter>
		)

		modal = screen.getByTestId('password-modal')
		current_password = screen.getByTestId('current-password')
		new_password = screen.getByTestId('new-password')
		new_password2 = screen.getByTestId('new-password2')
		submitButton = screen.getByRole('button', { name: /tallenna/i })

	})

	test('renders the passwordedit modal', () => {
		expect(modal).toBeDefined()
	})

	test('Current password is required', () => {
		expect(current_password).toBeRequired()
	})

	test('New password is required', () => {
		expect(new_password).toBeRequired()
	})

	test('Repeated password is required', () => {
		expect(new_password2).toBeRequired()
	})

	test('Errors if no inputs', async () => {
		const user = userEvent.setup()
		await user.click(submitButton)
		expect(screen.getByText('Anna salasana!')).toBeVisible()
		expect(screen.getByText('Anna kelvollinen salasana! Pituus 10-100 merkkiä.')).toBeVisible()
		expect(screen.getByText('Salasanat eivät täsmää!')).toBeVisible()
	})

	test('Typeing current password works', async () => {
		const user = userEvent.setup()
		await user.type(current_password, 'salasanani')
		expect(current_password).toHaveValue('salasanani')
	})

	test('Error with different repeated password', async () => {
		const user = userEvent.setup()
		await user.type(new_password, 'sanasala666')
		await user.type(new_password2, 'sanasala66')
		await user.click(submitButton)
		expect(screen.getByText('Salasanat eivät täsmää!')).toBeVisible()
	})
})
