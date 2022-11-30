import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import DeletedReportList from './DeletedReportList'
import { renderWithProviders } from '../../utils/test-tools'
import store from '../../redux/store'
import { login } from '../../redux/reducers/userReducer'
import { appendInventory } from '../../redux/reducers/inventoryReducer'
import { appendAreas } from '../../redux/reducers/areaReducer'
import { appendDeletedInventories } from '../../redux/reducers/deletedInventoryReducer'

const user = {'auth':'xyz', 
	'user':{'id':'u1', 
		'name':'Miko', 
		'email':'malliton@email.fi', 
		'phone':'+358748573829', 
		'username':'miko1', 
		'admin':'0'}
}

const inventory = {'id': '1',
	'inventorydate': '2022-01-01',
	'method': 'echo',
	'visibility': 'good',
	'moreInfo': 'poistaminen on kivaa',
	'user': {'id':'u1', 'name': 'Miko'},
	'city': 'Utsjoki'
}

const areas = [{'inventoryId': '1', 'id':'a1',
	'coordinates': [{lat: 60.13918005, lng: 24.92832183},
		{lat: 60.140376, lng: 24.984626770},
		{lat: 60.172837, lng: 24.99938}]}]

store.dispatch(login(user))
store.dispatch(appendInventory(inventory))
store.dispatch(appendAreas(areas))
store.dispatch(appendDeletedInventories(inventory))

        describe('DeletedReportList', () => {

            beforeEach(() => {
                renderWithProviders(
                    <MemoryRouter>
                        <DeletedReportList />
                    </MemoryRouter>
                )	
            })
        
            test('Deletion request shows on screen', () => {
                expect(screen.getByText('Miko')).not.toBeNull()
            })
        
        })
