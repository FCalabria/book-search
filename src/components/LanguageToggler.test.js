import React from 'react';
import LanguageToggler from './LanguageToggler';
import {render, toggleLanguageMock, fireEvent} from '../../tests/test-utils'
import {languages} from '../language-context'

describe('LanguageToggler', () => {
  test('should render one option for each language key', () => {
    const { getAllByRole } = render(<LanguageToggler />)
    const options = getAllByRole('option')
    expect(options).toHaveLength(Object.keys(languages).length)
    const optionsValues = options.map(optionDOM => optionDOM.textContent)
    expect(optionsValues).toEqual(Object.keys(languages))
  })
  test.each([
    'ES',
    'EN'
  ])('should call toggleLanguage on the context when an option is selected', (lang) => {
    const { getByRole } = render(<LanguageToggler />)
    const select = getByRole('combobox')
    fireEvent.change(select, {target: {value: lang}})
    expect(toggleLanguageMock).toHaveBeenCalledWith(lang)
  })
})