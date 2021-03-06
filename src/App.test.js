import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import {languages} from './language-context'
import TestRenderer from 'react-test-renderer'
import apiFetch from './utils/api'
jest.mock('./utils/api')

describe('App', () => {
  describe('Language', () => {
    test('should set spanish language by default', () => {
      const {getByPlaceholderText} = render(<App></App>)
      const inputPlaceholder = getByPlaceholderText(languages.ES.search)
      expect(inputPlaceholder).toBeInTheDocument()
    })
    test('should change language when toggleLanguage is called', () => {
      const appInstance = TestRenderer.create(<App></App>).getInstance()
      appInstance.toggleLanguage('EN')
      expect(appInstance.state.language.language).toMatchObject(languages.EN)
      expect(appInstance.state.language.selected).toEqual('EN')
    })
  })
  jest.resetModules()
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
      jest.doMock('./components/BookDetail')
      jest.doMock('./components/SearchBar')
      jest.doMock('./components/LanguageToggler')
      jest.doMock('./components/Loader')
      jest.mock('./utils/api')
    })
    test('should call the API with the search term when onNewSearch is fired', () => {
      apiFetch.mockResolvedValue(fakeResponse)
      const appInstance = TestRenderer.create(<App></App>).getInstance()
      appInstance.state.searchTerm = 'Searching this'
      appInstance.onNewSearch()

      expect(apiFetch).toHaveBeenCalledTimes(1)
      expect(apiFetch).toHaveBeenCalledWith(
        expect.stringMatching(/searching/i)
      )
    })
    test('should render the filtered result when a search is done', async () => {
      const apiFetch = require('./utils/api').default
      apiFetch.mockResolvedValue(fakeResponse)
      const App = require('./App').default;

      const {getAllByText, getByRole} = render(<App></App>)
      await searchTerm('search term', getByRole)
      
      const results = getAllByText('same author')
      expect(results).toHaveLength(fakeResponse.docs.length - 1)
    })
    test('should render the filtered result when a similar search is done', async () => {
      const apiFetch = require('./utils/api').default
      apiFetch.mockResolvedValue(fakeResponse)
      const App = require('./App').default;

      const {getAllByRole, getByRole, getAllByText} = render(<App></App>)
      await searchTerm('search term', getByRole)
      
      const firstButton = getAllByRole('button', {name: 'similar button mock'})[0]
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
