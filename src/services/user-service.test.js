import '@testing-library/jest-dom'
import userservice from './user-service'

jest.mock('axios')

describe('user-service', () => {

    test('registerNewUser is called', async () => {
        const results = await userservice.registerNewUser(
            'testaaja',
            'testisalasana',
            'testmail@email.com',
            '0451111111',
            'Tapani Testaaja'
        )

        expect(results).toBeDefined()
    })

    test('loginRequest is called', async () => {
        const results = await userservice.loginRequest(
            'testaaja',
            'testisalasana'
        )

        expect(results).toBeDefined()
    })

    test('setAdmin is called', async () => {
        const results = await userservice.setAdmin(
            'testaaja',
            1
        )

        expect(results).toBeDefined()
    })

    test('userEditRequest is called', async () => {
        const results = await userservice.userEditRequest(
            'Tapani Testaaja',
            '0451111111',
            'testmail@email.com',
            'testaaja'
        )

        expect(results).toBeDefined()
    })

    test('passwordEditRequest is called', async () => {
        const results = await userservice.passwordEditRequest(
            'testisalasana',
            'uusisalasana'
        )

        expect(results).toBeDefined()
    })

})
