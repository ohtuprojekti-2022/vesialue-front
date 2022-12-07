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

    test('addInventory is called', async () => {
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
    })

    test('getAllAreas is called', async () => {
        const results = await inventoryservice.getAllAreas()
        
        expect(results).toBeDefined()
    })

    test('getInventoryById is called', async () => {
        const results = await inventoryservice.getInventoryById('1')
        
        expect(results).toBeDefined()
    })

    test('requestEdit is called', async () => {
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
    })

    test('getEditedInventoryById is called', async () => {
        const results = await inventoryservice.getEditedInventoryById('1')
        
        expect(results).toBeDefined()
    })

    test('rejectEditById is called', async () => {
        const results = await inventoryservice.rejectEditById('1')
        
        expect(results).toBeDefined()
    })

    test('approveEditById is called', async () => {
        const results = await inventoryservice.approveEditById('1')
        
        expect(results).toBeDefined()
    })

    test('requestDelete is called', async () => {
        const results = await inventoryservice.requestDelete("siks", '1')
        
        expect(results).toBeDefined()
    })

    test('getAllDeletedInventories is called', async () => {
        const results = await inventoryservice.getAllDeletedInventories()
        
        expect(results).toBeDefined()
    })

    test('getDeletedInventoryById is called', async () => {
        const results = await inventoryservice.getDeletedInventoryById('1')
        
        expect(results).toBeDefined()
    })
})