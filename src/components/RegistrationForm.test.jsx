import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import RegistrationForm from './RegistrationForm'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'


describe('Registration Form', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<RegistrationForm />
			</MemoryRouter>
		)
	})

	test('renders registration form', () => {
		const element = screen.getByTestId('registration-form')
		expect(element).toBeDefined()
	})

	test('no user details stored before registration', () => {
		expect(localStorage.getItem('userDetails')).toBeNull()
	})

	test('registration requires username', async () => {
		const submitButton = screen.getByTestId('submit')
		act(() => {
			submitButton.click()
		})
		const element = screen.getByText('Anna vähintään 3 merkkiä pitkä käyttäjänimi!')
		expect(element).toBeDefined()
	})
})