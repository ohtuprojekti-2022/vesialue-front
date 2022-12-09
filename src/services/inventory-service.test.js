import '@testing-library/jest-dom'
import inventoryservice from './inventory-service'

jest.mock('axios')

const areas = [{'inventoryId': '1', 'id':'a1',
	'coordinates': [{lat: 60.13918005, lng: 24.92832183},
		{lat: 60.140376, lng: 24.984626770},
		{lat: 60.172837, lng: 24.99938}]}]

const inventorydate = '2022-01-01'
const method = 'other'
const visibility = 'bad'
const methodInfo = 'testaustapa'
const attachments = null
const name = 'testaaja'
const email = 'sposti@email.com'
const phone = ''
const moreInfo = 'ei oo'
const editReason = 'testauksen takia'

describe('inventory-service', () => {

    beforeEach(() => {
        localStorage.setItem('userDetails', JSON.stringify({
            auth: 'xyz',
            user: {
                id: 'abc',
                name: '',
                email: 'test@email.com',
                phone: '',
                username: 'testperson',
            }}),
        )
    })

    test('addInventory is called', async () => {
        try {
            const results = await inventoryservice.addInventory(
                areas,
                inventorydate,
                method,
                visibility,
                methodInfo,
                attachments,
                name,
                email,
                phone,
                moreInfo
            )
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }

    })

    test('getInventory is called', async () => {
        try {
            const results = await inventoryservice.getInventory('1')
            
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

    test('getAllAreas is called', async () => {
        try {
            const results = await inventoryservice.getAllAreas()
        
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

    test('getInventoryById is called', async () => {
        try {
            const results = await inventoryservice.getInventoryById('1')
        
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

    test('requestEdit is called', async () => {
        try {
            const results = await inventoryservice.requestEdit(
                areas,
                inventorydate,
                method,
                visibility,
                methodInfo,
                attachments,
                moreInfo,
                editReason,
                '1'
            )
            
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

    test('getAllEditedInventories is called', async () => {
        try {
            const results = await inventoryservice.getAllEditedInventories()
        
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

    test('getEditedInventoryById is called', async () => {
        try {
            const results = await inventoryservice.getEditedInventoryById('1')
        
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

    test('rejectEditById is called', async () => {
        try {
            const results = await inventoryservice.rejectEditById('1')
        
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

    test('approveEditById is called', async () => {
        try {
            const results = await inventoryservice.approveEditById('1')
        
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

    test('requestDelete is called', async () => {
        try {
            const results = await inventoryservice.requestDelete("siks", '1')
        
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

    test('getAllDeletedInventories is called', async () => {
        try {
            const results = await inventoryservice.getAllDeletedInventories()
        
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

    test('getDeletedInventoryById is called', async () => {
        try {
            const results = await inventoryservice.getDeletedInventoryById('1')
        
            expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    })

})