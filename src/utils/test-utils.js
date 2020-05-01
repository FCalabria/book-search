import React from 'react'
import { render } from '@testing-library/react'
import {LanguageProvider, languages} from '../language-context'


const AllTheProviders = ({ children }) => {
  return (
    <LanguageProvider value={{
      language: languages.ES,
      keys: Object.keys(languages),
      selected: 'ES',
      toggleLanguage: () => {}
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
export { customRender as render }
