import '@testing-library/jest-dom'
import { uploadAttachment } from './attachment-service'

jest.mock('axios')

describe('user-service', () => {

    test('uploadAttachment is called', async () => {
        try {
            const results = await uploadAttachment(
                'somedata'
            )
            expect(results).toBeDefined()
            } catch (error) {
                expect(error.toString()).toContain('TypeError')
            }
        
    })

})
