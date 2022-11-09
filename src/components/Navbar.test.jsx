import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from './Navbar'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '../utils/test-tools'


describe('Navbar', () => {

	const userDetails = {'auth':'xyz',
		'user':{'id':'ifbr2sa3mxdqrzgjo6nmw862', 'name':'Mikko',
			'email':'mikko@email.fi', 'phone':'0404040400',
			'username':'mikko1', 'admin':'0'}}
    
    beforeEach(() => {
        renderWithProviders(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )
    })

    test('shows user as Käyttäjä when logged out', () => {
        expect(screen.getByText('Käyttäjä')).not.toBeNull
    })

})