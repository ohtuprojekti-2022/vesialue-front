import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from './footer'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../utils/test-tools'
import userEvent from '@testing-library/user-event'

describe('Footer', () => {
	const mockSetShowTOS = jest.fn()
	const mockSetShowPP = jest.fn()

	beforeEach(() => {
		renderWithProviders(
			<MemoryRouter>
				<Footer 
					setShowTOS={mockSetShowTOS}
					setShowPP={mockSetShowPP}/>
			</MemoryRouter>
		)
	})

	test('Footer is rendered and displays correct info', () => {
		expect(screen.getByText('Suomen Meriarkeologinen Seura ry')).not.toBeNull()
		expect(screen.getByText('Finlands Marinarkeologiska Sällskap rf')).not.toBeNull()
		expect(screen.getByText('Sähköposti:')).not.toBeNull()
		expect(screen.getByText('Linkkejä')).not.toBeNull()
		expect(screen.getByText('mas.fi')).not.toBeNull()
		expect(screen.getByText('Yhteystiedot')).not.toBeNull()
		expect(screen.getByText('MAS-portaali')).not.toBeNull()
		expect(screen.getByText('Helsingin Yliopisto')).not.toBeNull()
	})

	test('Terms of Service can be clicked', async () => {
		const user = userEvent.setup()
		const tos = screen.getByTestId('tos')
		await user.click(tos)
	})

	test('Privacy policy can be clicked', async () => {
		const user = userEvent.setup()
		const pp = screen.getByTestId('pp')
		await user.click(pp)
	})

})