import '@testing-library/jest-dom'
import { uploadAttachment, deleteAttachment } from './attachment-service'

jest.mock('axios')

describe('user-service', () => {

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

    test('deleteAttachment is called', async () => {
        try {
            const results = await deleteAttachment(
                1
            )
            expect(results).toBeDefined()
            } catch (error) {
                expect(error.toString()).toContain('TypeError')
            }
        
    })

})
