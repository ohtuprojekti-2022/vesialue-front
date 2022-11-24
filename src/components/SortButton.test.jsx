import React from 'react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../utils/test-tools'
import SortButton from './SortButton'
import store from '../redux/store'
import { updateFilter } from '../redux/reducers/filterReducer'

describe('SortButton', () => {
	beforeEach(() => {
		const handleSort = (e) => {
			store.dispatch(updateFilter({ id: e.target.id, value: e.target.value }))
		}

		renderWithProviders(
			<MemoryRouter>
				<SortButton handleSort={handleSort} />
			</MemoryRouter>)
	})

	test('display text changes correctly when clicked', async () => {
		const sortButton = screen.getByRole('button', { name: 'Uusin inventointi ensin' })
		const user = userEvent.setup()
		await user.click(sortButton)
		expect(sortButton).toHaveTextContent('Vanhin inventointi ensin')
		await user.click(sortButton)
		expect(sortButton).toHaveTextContent('Uusin inventointi ensin')
	})

})