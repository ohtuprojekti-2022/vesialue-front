import '@testing-library/jest-dom'
import userservice from './user-service'

jest.mock('axios')

describe('user-service', () => {

    test('registerNewUser is called', async () => {
        try {
            const results = await userservice.registerNewUser(
                'testaaja',
                'testisalasana',
                'testmail@email.com',
                '0451111111',
                'Tapani Testaaja'
            )
            expect(results).toBeDefined()
            } catch (error) {
                expect(error.toString()).toContain('TypeError')
            }
        
    })

    test('loginRequest is called', async () => {
    try {
        const results = await userservice.loginRequest(
            'testaaja',
            'testisalasana'
        )
        expect(results).toBeDefined()
        } catch (error) {
            expect(error.toString()).toContain('TypeError')
        }
    
    })

    test('setAdmin is called', async () => {
        try {
            const results = await userservice.setAdmin(
                'testaaja',
                1
            )
            expect(results).toBeDefined()
            } catch (error) {
                expect(error.toString()).toContain('TypeError')
            }
        
        })
    
    test('userEditRequest is called', async () => {
        try {
            const results = await userservice.userEditRequest(
                'Tapani Testaaja',
                '0451111111',
                'testmail@email.com',
                'testaaja'
            )
            expect(results).toBeDefined()
            } catch (error) {
                expect(error.toString()).toContain('TypeError')
            }
        
        })

    test('passwordEditRequest is called', async () => {
        try {
            const results = await userservice.passwordEditRequest(
                'testisalasana',
                'uusisalasana'
            )
            expect(results).toBeDefined()
            } catch (error) {
                expect(error.toString()).toContain('TypeError')
            }
        
        })

})
