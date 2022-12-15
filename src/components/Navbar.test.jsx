import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from './Navbar'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../utils/test-tools'
import store from '../redux/store'
import { login } from '../redux/reducers/userReducer'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

jest.mock('axios')

const userDetails = {
	'auth': 'xyz',
	'user': {
		'id': 'ifbr2sa3mxdqrzgjo6nmw862', 'name': 'Mikko',
		'email': 'mikko@email.fi', 'phone': '0404040400',
		'username': 'mikko1', 'admin': '0'
	}
}

const adminUserDetails = {
	'auth': 'xyz',
	'user': {
		'id': 'ifbr2sa3mxdqrzgjo6nmw862', 'name': 'Mikko',
		'email': 'mikko@email.fi', 'phone': '0404040400',
		'username': 'mikko1', 'admin': '1'
	}
}

describe('Navbar when logged in', () => {
	beforeEach(() => {
		store.dispatch(login(userDetails))
		renderWithProviders(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		)
	})

	test('shows username when logged in', () => {
		expect(screen.getByText('mikko1')).not.toBeNull
	})

	test('shows logout button when logged in', async () => {
		const DropDown = screen.getByRole('button', { name: /mikko1/i })
		const user = userEvent.setup()
		await user.click(DropDown)
		expect(screen.getByText('Kirjaudu ulos')).not.toBeNull
	})

	test('shows own page button when logged in', async () => {
		const DropDown = screen.getByRole('button', { name: /mikko1/i })
		const user = userEvent.setup()
		await user.click(DropDown)
		expect(screen.getByText('Oma sivu')).not.toBeNull
	})

	test('shows user as Käyttäjä when logged out', async () => {
		axios.get.mockResolvedValueOnce('mock response')
		const DropDown = screen.getByRole('button', { name: /mikko1/i })
		const user = userEvent.setup()
		await user.click(DropDown)
		const logoutButton = screen.getByText('Kirjaudu ulos')
		await user.click(logoutButton)
		expect(screen.getByText('Käyttäjä')).not.toBeNull
	})
	
})

describe('Navbar when logged out', () => {
	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		)
	})

	test('shows login when logged out', async () => {
		const user = userEvent.setup()
		const DropDown = screen.getByRole('button', { name: /Käyttäjä/i })
		await user.click(DropDown)
		expect(screen.getByText('Kirjaudu')).not.toBeNull
	})

	test('shows register when logged out', async () => {
		const user = userEvent.setup()
		const DropDown = screen.getByRole('button', { name: /Käyttäjä/i })
		await user.click(DropDown)
		expect(screen.getByText('Rekisteröidy')).not.toBeNull
	})

})

describe('Navbar when logged in as admin', () => {
	beforeEach(() => {
		store.dispatch(login(adminUserDetails))
		renderWithProviders(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		)
	})

	test('shows edit requests when logged in as admin', async () => {
		const user = userEvent.setup()
		const DropDown = screen.getByRole('button', { name: /mikko1/i })
		await user.click(DropDown)
		expect(screen.getByText('Muokkauspyynnöt')).not.toBeNull
	})

})