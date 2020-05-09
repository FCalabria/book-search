import React from 'react';
import { render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import App from './App';
import {languages} from './language-context'
import apiFetch from './utils/api';
jest.mock('./utils/api')

describe('App', () => {
  describe('language change', () => {
    test('should set spanish as the default language', () => {
      const {getByPlaceholderText} = render(<App />)
      expect(getByPlaceholderText(languages.ES.search)).toBeTruthy()
    })
    test('should change language in the state when toggleLanguage is called', () => {
      // Whitebox testing. Use only in complex parts. Not like here, but this is an example
      const appInstance = TestRenderer.create(<App />).getInstance()
      expect(appInstance.state.language.language).toMatchObject(languages.ES)
      appInstance.toggleLanguage('EN')
      expect(appInstance.state.language.language).toMatchObject(languages.EN)
    })
  })
  describe('onNewSearch', () => {
    const fakeResponse = {
      docs: [
        {isbn: ['123'], subject: ['fake']},
        {isbn: ['456'], subject: ['fake']},
        {subject: ['fake']},
        {isbn: ['789'], subject: ['fake']},
      ],
      numFound: 4
    }
    beforeEach(() => {
      apiFetch.mockClear()
      apiFetch.mockResolvedValue(fakeResponse)
    })
    test.each([
      ['something with spaces', 'something+with%20spaces'],
      ['123%&ñá´üô', '123%25%26%C3%B1%C3%A1%C2%B4%C3%BC%C3%B4']
    ])('should call the API with the correct searchTerm when onNewSearch is fired', (term, expected) => {
      const appInstance = TestRenderer.create(<App />).getInstance()
      appInstance.state.searchTerm = term
      appInstance.onNewSearch()
      expect(apiFetch).toHaveBeenCalledTimes(1)
      // expect(apiFetch).toHaveBeenCalledWith(`search.json?q=${expected}&mode=ebooks&has_fulltext=true&page=1`)
      expect(apiFetch).toHaveBeenCalledWith(
        expect.stringContaining(`search.json?q=${expected}&`)
      )
    })
    test('should set the filtered result on the state', async () => {
      const appInstance = TestRenderer.create(<App />).getInstance()
      appInstance.state.searchTerm = 'mockTerm'
      await appInstance.onNewSearch()

      expect(appInstance.state).toMatchObject({searchFound: fakeResponse.numFound})
      expect(appInstance.state.searchData).toHaveLength(fakeResponse.docs.length - 1)
      expect(appInstance.state.searchData).toEqual([
        fakeResponse.docs[0],
        fakeResponse.docs[1],
        fakeResponse.docs[3],
      ])
    })
  })
  describe('onSubjectSearch', () => {
    const fakeResponse = {
      docs: [
        {isbn: ['123'], subject: ['fake']},
        {isbn: ['456'], subject: ['fake']},
        {subject: ['fake']},
        {isbn: ['789'], subject: ['fake']},
      ],
      numFound: 4
    }
    beforeEach(() => {
      apiFetch.mockClear()
      apiFetch.mockResolvedValue(fakeResponse)
    })
    test.each([
      ['something with spaces', 'something+with%20spaces'],
      ['123%&ñá´üô', '123%25%26%C3%B1%C3%A1%C2%B4%C3%BC%C3%B4']
    ])('should call the API with the correct searchTerm when onSubjectSearch is fired', (term, expected) => {
      const appInstance = TestRenderer.create(<App />).getInstance()
      appInstance.onSubjectSearch(term)
      expect(apiFetch).toHaveBeenCalledTimes(1)
      expect(apiFetch).toHaveBeenCalledWith(
        expect.stringContaining(`search.json?subject=${expected}&`)
      )
    })
    test('should set the filtered result on the state', async () => {
      const appInstance = TestRenderer.create(<App />).getInstance()
      await appInstance.onSubjectSearch('mockTerm')

      expect(appInstance.state).toMatchObject({searchFound: fakeResponse.numFound})
      expect(appInstance.state.searchData).toHaveLength(fakeResponse.docs.length - 1)
      expect(appInstance.state.searchData).toEqual([
        fakeResponse.docs[0],
        fakeResponse.docs[1],
        fakeResponse.docs[3],
      ])
    })
  })
})
