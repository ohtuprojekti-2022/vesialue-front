import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import FilterForm from './FilterForm'
import { renderWithProviders } from '../utils/test-tools'


describe('FilterForm', () => {
    let filterForm

    beforeEach(() => {
        renderWithProviders(
            <MemoryRouter>
                <FilterForm />
            </MemoryRouter>
        )
        filterForm = screen.getByTestId('filterform')
    })

    test('Form is defined', () => {
        expect(filterForm).toBeDefined()
    })

})