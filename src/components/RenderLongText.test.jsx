import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import RenderLongText from './RenderLongText'


describe('RenderLongText', () => {
	test.each([20, 500, 5000])('Should only render substring of given maxLength (%i) and "Show more" link', (maxLength) => {
		const text = 'a'.repeat(maxLength) + 'Some more text'
		render(
			<MemoryRouter>
				<RenderLongText text={text} maxLength={maxLength} />
			</MemoryRouter>
		)
		const element = screen.getByTestId('long-textcontent')
		expect(element.textContent).not.toMatch('Some more text')
		expect(element.textContent).toMatch('Näytä enemmän')
	})

	test('After clicking "Show more", should render the whole text and "Show less" link', async () => {
		const text = 'a'.repeat(500) + 'Some more text'
		render(
			<MemoryRouter>
				<RenderLongText text={text} maxLength={500} />
			</MemoryRouter>)

		const user = userEvent.setup()
		await user.click(screen.getByText('Näytä enemmän', { exact: false }))
		const element = screen.getByTestId('long-textcontent')
		expect(element.textContent).toMatch('Some more text')
		expect(element.textContent).toMatch('Näytä vähemmän')
	})
})

