import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import {languages} from './language-context'
import apiFetch from './utils/api'
jest.mock('./utils/api')

describe('App + components', () => {
  describe('Language', () => {
    test('should change language when toggleLanguage is called', () => {
      const {getByRole, getByPlaceholderText} = render(<App></App>)
      const select = getByRole('combobox')
      const inputPlaceholder = getByPlaceholderText(languages.ES.search)
      expect(inputPlaceholder).toBeInTheDocument()

      fireEvent.change(select, {target: {value: 'EN'}})
      expect(getByPlaceholderText(languages.EN.search)).toBeInTheDocument()
      expect(() => {
        getByPlaceholderText(languages.ES.search)
      }).toThrow()
    })
  })
  describe('Search', () => {
    const fakeResponse = {
      docs: [
        {isbn: ['123'], subject: ['fake'], author_name: ['same author']},
        {isbn: ['456'], subject: ['fake'], author_name: ['same author']},
        {subject: ['fake'], author_name: ['same author']},
        {isbn: ['789'], subject: ['fake'], author_name: ['same author']},
      ],
      numFound: 4
    }
    const searchTerm = (value, getByRole) => {
      const searchInput = getByRole('textbox')
      const searchForm = getByRole('form')
      fireEvent.change(searchInput, {target: {value}})
      return fireEvent.submit(searchForm)
    }
    beforeEach(() => {
      apiFetch.mockClear()
      apiFetch.mockResolvedValue(fakeResponse)
    })
    test('should render the filtered result when a search is done', async () => {
      const {getAllByText, getByRole} = render(<App></App>)
      await searchTerm('search term', getByRole)

      const results = getAllByText('same author')
      expect(results).toHaveLength(fakeResponse.docs.length - 1)
    })
    test('should render the filtered result when a similar search is done', async () => {
      const {getAllByRole, getByRole, getAllByText} = render(<App></App>)
      await searchTerm('search term', getByRole)

      const firstButton = getAllByRole('button', {name: 'Buscar parecido'})[0]
      apiFetch.mockResolvedValue({
        docs: [
          {isbn: ['123'], subject: ['other book'], author_name: ['other author']},
        ],
        numFound: 1
      })
      await fireEvent.click(firstButton)
      const results = getAllByText('other author')
      expect(results).toHaveLength(1)
    })
  })
})
