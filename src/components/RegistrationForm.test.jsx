import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import RegistrationForm from './RegistrationForm'
import { MemoryRouter } from 'react-router-dom'

test('renders content', () => {
    render(
    <MemoryRouter>
      <RegistrationForm />
    </MemoryRouter>)
  
    const element = screen.getByTestId('registration-form')
    expect(element).toBeDefined()
  })