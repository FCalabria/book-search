import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import {languages} from './language-context'
import apiFetch from './utils/api';
jest.mock('./utils/api')

describe('[INT] App', () => {
  describe('language change', () => {
    test('should change language when the language toggler is clicked', () => {
      const {getByPlaceholderText, getByRole} = render(<App />)
      expect(getByPlaceholderText(languages.ES.search)).toBeInTheDocument()

      const toggler = getByRole('combobox')
      fireEvent.change(toggler, {target: {value: 'EN'}})
      expect(() => {getByPlaceholderText(languages.ES.search)}).toThrow()
      expect(getByPlaceholderText(languages.EN.search)).toBeInTheDocument()
    })
  })
  describe('search a title', () => {
    const fakeResponse = {
      docs: [
        {isbn: ['123'], subject: ['fake'], author_name: ['The same author'], title: 'First book title'},
        {isbn: ['456'], subject: ['fake'], author_name: ['The same author'], title: 'Second book title'},
        {isbn: ['789'], subject: ['fake'], author_name: ['The same author'], title: 'Third book title'},
      ],
      numFound: 3
    }
    function writeSearchTerm (getByRole) {
      const searchInput = getByRole('textbox', {name: languages.ES.search})
      fireEvent.change(searchInput, { target: { value: 'search term' }})
    }
    beforeEach(() => {
      apiFetch.mockClear()
      apiFetch.mockResolvedValue(fakeResponse)
    })
    test('should call the API when the search button is clicked', () => {
      const {getByRole} = render(<App />)
      writeSearchTerm(getByRole)

      const searchButton = getByRole('button', {name: /buscar/i})
      fireEvent.click(searchButton)
      expect(apiFetch).toHaveBeenCalledTimes(1)
      expect(apiFetch).toHaveBeenCalledWith('search.json?q=search+term&mode=ebooks&has_fulltext=true&page=1')
    })
    test('should call the API when the search form is submited', () => {
      const {getByRole} = render(<App />)
      writeSearchTerm(getByRole)
      const searchForm = getByRole('form')
      fireEvent.submit(searchForm)
      expect(apiFetch).toHaveBeenCalledTimes(1)
      expect(apiFetch).toHaveBeenCalledWith('search.json?q=search+term&mode=ebooks&has_fulltext=true&page=1')
    })
    test('should show the search results', async () => {
      const {getByRole, getAllByText, container} = render(<App />)
      writeSearchTerm(getByRole)
      const searchButton = getByRole('button', {name: /buscar/i})
      await fireEvent.click(searchButton)
      const results = getAllByText(fakeResponse.docs[0].author_name[0])
      expect(results).toHaveLength(fakeResponse.numFound)
      fakeResponse.docs.forEach(book => {
        expect(container.firstChild).toHaveTextContent(book.title)
      })
    })
  })
  describe('search similar', () => {
    const fakeResponse = {
      docs: [
        {isbn: ['123'], subject: ['fake'], author_name: ['The same author'], title: 'First book title'},
        {isbn: ['456'], subject: ['fake'], author_name: ['The same author'], title: 'Second book title'},
        {isbn: ['789'], subject: ['fake'], author_name: ['The same author'], title: 'Third book title'},
      ],
      numFound: 3
    }
    function doSearch (getByRole) {
      const searchInput = getByRole('textbox', {name: languages.ES.search})
      fireEvent.change(searchInput, { target: { value: 'search term' }})
      const searchForm = getByRole('form')
      return fireEvent.submit(searchForm)
    }
    beforeEach(() => {
      apiFetch.mockClear()
      apiFetch.mockResolvedValue(fakeResponse)
    })
    test('should call the API when search similar button is clicked', async () => {
      const {getByRole, getAllByRole} = render(<App />)
      await doSearch(getByRole)
      apiFetch.mockClear()
      const similarButton = getAllByRole('button', {name: languages.ES.similar})[0]
      fireEvent.click(similarButton)
      expect(apiFetch).toHaveBeenCalledTimes(1)
      expect(apiFetch).toHaveBeenCalledWith(
        expect.stringContaining('search.json?subject=fake&')
      )
    })
    test('should show the new results when similar button is clicked', async () => {
      const {getByRole, getAllByRole, container} = render(<App />)
      await doSearch(getByRole)
      apiFetch.mockClear()
      apiFetch.mockResolvedValue({
        docs: [
          {isbn: ['123'], subject: ['fake'], author_name: ['The same author'], title: 'A different title'},
        ],
        numFound: 1
      })
      const similarButton = getAllByRole('button', {name: languages.ES.similar})[0]
      await fireEvent.click(similarButton)
      expect(container.firstChild).toHaveTextContent('A different title')
    })
  })
})
