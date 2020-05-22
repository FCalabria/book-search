import React from 'react';
import { render, fireEvent } from '../../tests/test-utils';
import LanguageToggler from './LanguageToggler';
import {languages} from '../language-context'
import {toggleLanguageMock} from '../../tests/test-utils'


describe('LanguageToggler', () => {
  test('should render correctly', () => {
    const container = render(<LanguageToggler />).container
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render one option for each langauge key', () => {
    const { getAllByRole } = render(<LanguageToggler />)
    const options = getAllByRole('option')
    const optionsValues = options.map(opt => opt.textContent)
    expect(optionsValues).toEqual(Object.keys(languages))
  })
  test.each(Object.keys(languages))('should call toggleLanguage on the context when %s is selected', (lang) => {
    toggleLanguageMock.mockClear()
    const { getByRole } = render(<LanguageToggler />)
    const select = getByRole('combobox')
    const {value} = getByRole('option', {name: lang})
    fireEvent.change(select, {target: {value}})
    expect(toggleLanguageMock).toHaveBeenCalledWith(lang)
  })
})
