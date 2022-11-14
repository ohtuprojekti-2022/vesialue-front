import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../redux/store'

export const renderWithProviders = element => {
    render(
        <Provider store={store}>
            {element}
        </Provider>
    )
}
