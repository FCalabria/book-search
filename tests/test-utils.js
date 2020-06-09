import React from 'react'
import { render } from '@testing-library/react'
import {LanguageProvider, languages} from '../src/language-context'

const toggleLanguageMock = jest.fn()
const AllTheProviders = ({ children }) => {
  return (
    <LanguageProvider value={{
      language: languages.ES,
      keys: Object.keys(languages),
      selected: 'ES',
      toggleLanguage: toggleLanguageMock
    }}>
      {children}
    </LanguageProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render, toggleLanguageMock }